/**
 * ====================================================================
 * منصة خدماتي البرمجية - منطق التطبيق التفاعلي (JavaScript خالص)
 * ====================================================================
 * كود JavaScript قياسي (Vanilla JS) يعمل في المتصفح مباشرة دون أي إطارات عمل.
 * يقرأ الإعدادات من ملف js/config.js ويدير تفاعلات الواجهة ونموذج الطلب ومعرض الأعمال.
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.APP_CONFIG || {};

  // 1. تهيئة الروابط والبيانات من ملف الإعدادات
  initBrandingAndContact(config);

  // 2. إدارة شريط التنقل والقائمة للجوال
  initNavigation();

  // 3. عرض وتصفية معرض الأعمال
  initPortfolio(config);

  // 4. إدارة نافذة تفاصيل المشروع (Modal)
  initProjectModal(config);

  // 5. إدارة نموذج طلب الخدمة وحساب التكلفة وربط واتساب
  initServiceOrderForm(config);

  // 6. إدارة قائمة الأسئلة الشائعة (FAQ Accordion)
  initFaqAccordion();
});

/**
 * تهيئة أسماء وهوية المنصة وروابط التواصل المباشر
 */
function initBrandingAndContact(config) {
  // اسم الموقع
  const brandElements = document.querySelectorAll('[data-bind="siteName"]');
  brandElements.forEach(el => {
    el.textContent = config.siteName || "خدماتي البرمجية";
  });

  // تحديث أسعار الباقة الافتتاحية
  if (config.introPackage) {
    const priceEl = document.querySelector('[data-bind="introPrice"]');
    if (priceEl) priceEl.textContent = config.introPackage.priceUSD || 60;
  }

  // رابط الواتساب العام
  const phone = config.contact?.whatsAppNumber || "966500000000";
  const defaultMsg = encodeURIComponent(config.contact?.defaultWhatsAppMessage || "مرحباً، أود الاستفسار عن تصميم موقع لمشروعي.");
  const whatsAppUrl = `https://wa.me/${phone}?text=${defaultMsg}`;

  const whatsappLinks = document.querySelectorAll('[data-bind="whatsappLink"]');
  whatsappLinks.forEach(link => {
    link.href = whatsAppUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // عرض رقم الهاتف للزوار
  const phoneDisplay = document.querySelector('[data-bind="phoneDisplay"]');
  if (phoneDisplay) {
    phoneDisplay.textContent = config.contact?.phoneFormatted 
      ? `${config.contact.phoneFormatted} (${phone}+)` 
      : `+${phone}`;
  }

  // ربط البريد الإلكتروني للزوار
  const emailVal = config.contact?.email || "amoal2030@gmail.com";
  const emailElements = document.querySelectorAll('[data-bind="emailDisplay"]');
  emailElements.forEach(el => {
    el.textContent = emailVal;
    if (el.tagName === 'A') {
      el.href = `mailto:${emailVal}`;
    }
  });
}

/**
 * إدارة القائمة العلوية والتمرير السلس والقائمة للجوال
 */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
    });

    // إغلاق القائمة عند النقر على أي رابط
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // تمييز الرابط النشط أثناء التمرير (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(sec => observer.observe(sec));
  }
}

/**
 * بناء وتصفية بطاقات معرض الأعمال
 */
function initPortfolio(config) {
  const projectsContainer = document.getElementById('projectsContainer');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = config.projects || [];

  if (!projectsContainer) return;

  function renderProjects(filter = 'all') {
    projectsContainer.innerHTML = '';

    const filtered = filter === 'all' 
      ? projects 
      : projects.filter(p => p.category === filter);

    if (filtered.length === 0) {
      projectsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          لا توجد مشاريع في هذا التصنيف حالياً.
        </div>
      `;
      return;
    }

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-id', project.id);

      const isDevBadge = project.isUnderDevelopment 
        ? `<span class="project-badge-tag under-dev">قيد التطوير والبحث</span>`
        : `<span class="project-badge-tag">مشروع تجريبي</span>`;

      const tagsHtml = (project.technologies || [])
        .map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`)
        .join('');

      card.innerHTML = `
        <div class="project-media">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="project-thumb" loading="lazy" referrerpolicy="no-referrer">
          ${isDevBadge}
        </div>
        <div class="project-content">
          <div class="project-meta-info">
            <span>${escapeHtml(project.categoryName || '')}</span>
          </div>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <p class="project-summary">${escapeHtml(project.summary)}</p>
          <div class="project-tech-tags">
            ${tagsHtml}
          </div>
          <div class="project-actions">
            <button class="btn btn-secondary btn-sm open-project-btn" data-project-id="${escapeHtml(project.id)}">
              عرض التفاصيل الكاملة
            </button>
          </div>
        </div>
      `;

      projectsContainer.appendChild(card);
    });

    // إضافة مستمعي النقر لأزرار التفاصيل
    projectsContainer.querySelectorAll('.open-project-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-project-id');
        openProjectModalById(pId, config);
      });
    });
  }

  // التصفية عند النقر
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter') || 'all';
      renderProjects(category);
    });
  });

  // العرض الأولي
  renderProjects('all');
}

/**
 * نافذة تفاصيل المشروع المنبثقة (Modal)
 */
let activeModalProject = null;

function initProjectModal(config) {
  const modalBackdrop = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const directWhatsappBtn = document.getElementById('modalWhatsappBtn');

  if (!modalBackdrop) return;

  function closeModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // إغلاق عند النقر على الخلفية
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // إغلاق بزر Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // زر استفسار واتساب داخل النافذة
  if (directWhatsappBtn) {
    directWhatsappBtn.addEventListener('click', () => {
      if (!activeModalProject) return;
      const phone = config.contact?.whatsAppNumber || "966500000000";
      const text = encodeURIComponent(`السلام عليكم، اطلعت على مشروع "${activeModalProject.title}" وأود الاستفسار عن إمكانية تنفيذ موقع مشابه لنشاطي.`);
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    });
  }
}

function openProjectModalById(projectId, config) {
  const modalBackdrop = document.getElementById('projectModal');
  const project = (config.projects || []).find(p => p.id === projectId);
  if (!modalBackdrop || !project) return;

  activeModalProject = project;

  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalCategory').textContent = project.categoryName || '';
  document.getElementById('modalStatus').textContent = project.statusLabel || '';
  document.getElementById('modalDescription').textContent = project.fullDescription || project.summary;
  document.getElementById('modalClient').textContent = project.targetClient || 'مشاريع ناشئة';
  document.getElementById('modalTech').textContent = (project.technologies || []).join('، ');

  const modalImg = document.getElementById('modalImage');
  if (modalImg) {
    modalImg.src = project.image;
    modalImg.alt = project.title;
  }

  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/**
 * نموذج طلب الخدمة والتحقق من المدخلات وحساب التكلفة التقديرية
 */
function initServiceOrderForm(config) {
  const form = document.getElementById('serviceOrderForm');
  const serviceSelect = document.getElementById('orderService');
  const estimateCostEl = document.getElementById('estimateCostDisplay');
  const whatsappSubmitBtn = document.getElementById('sendWhatsappBtn');
  const copyDetailsBtn = document.getElementById('copyDetailsBtn');
  const successCard = document.getElementById('formSuccessCard');
  const resetFormBtn = document.getElementById('resetFormBtn');

  if (!form) return;

  // قراءة معلمات الرابط إن وجدت (مثل ?service=landing أو ?type=inquiry)
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const typeParam = urlParams.get('type');

  const requestTypeSelect = document.getElementById('requestType');
  if (typeParam && requestTypeSelect) {
    requestTypeSelect.value = typeParam;
  }

  if (serviceParam && serviceSelect) {
    // التحقق من وجود القيمة ضمن الخيارات
    const exists = Array.from(serviceSelect.options).some(opt => opt.value === serviceParam);
    if (exists) {
      serviceSelect.value = serviceParam;
    }
  }

  // تحديث التكلفة التقديرية التلقائية بناءً على الاختيار
  function updateEstimatedPrice() {
    const selected = serviceSelect.value;
    const reqType = requestTypeSelect ? requestTypeSelect.value : 'order';
    let priceText = "60 دولار";

    if (reqType === 'inquiry') {
      priceText = "استفسار مجاني (بدون تكلفة)";
    } else if (selected === 'landing') {
      priceText = "40 دولار";
    } else if (selected === 'intro-3pages') {
      priceText = "60 دولار (الباقة الافتتاحية)";
    } else if (selected === 'portfolio') {
      priceText = "50 دولار";
    } else if (selected === 'custom') {
      priceText = "حسب المتطلبات (يحدد بالاتفاق)";
    }

    if (estimateCostEl) {
      estimateCostEl.textContent = priceText;
    }
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateEstimatedPrice);
  }
  if (requestTypeSelect) {
    requestTypeSelect.addEventListener('change', updateEstimatedPrice);
  }
  updateEstimatedPrice();

  // جمع والتحقق من بيانات النموذج
  function validateAndGetFormData() {
    let isValid = true;

    const nameInput = document.getElementById('clientName');
    const contactInput = document.getElementById('clientContact');
    const businessTypeInput = document.getElementById('businessType');
    const serviceInput = document.getElementById('orderService');
    const detailsInput = document.getElementById('projectDetails');
    const timelineInput = document.getElementById('preferredTimeline');

    // إزالة رسائل الخطأ السابقة
    form.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));

    // التحقق من الاسم
    const nameVal = nameInput.value.trim();
    if (nameVal.length < 2) {
      setError(nameInput, "يرجى كتابة اسمك الكريم.");
      isValid = false;
    }

    // التحقق من وسيلة التواصل (رقم أو إيميل)
    const contactVal = contactInput.value.trim();
    if (contactVal.length < 6) {
      setError(contactInput, "يرجى كتابة رقم واتساب أو بريد إلكتروني صحيح.");
      isValid = false;
    }

    // التحقق من تفاصيل الطلب
    const detailsVal = detailsInput.value.trim();
    if (detailsVal.length < 5) {
      setError(detailsInput, "يرجى كتابة نبذة بسيطة عن طلبك أو فكرة موقعك أو استفسارك.");
      isValid = false;
    }

    if (!isValid) return null;

    const reqTypeLabel = requestTypeSelect 
      ? requestTypeSelect.options[requestTypeSelect.selectedIndex].text 
      : "طلب خدمة موقع";

    return {
      name: nameVal,
      contact: contactVal,
      requestType: reqTypeLabel,
      businessType: businessTypeInput ? (businessTypeInput.value.trim() || "غير محدد") : "غير محدد",
      service: serviceInput.options[serviceInput.selectedIndex].text,
      timeline: timelineInput ? timelineInput.options[timelineInput.selectedIndex].text : "خلال أسبوع",
      details: detailsVal,
      estimatedPrice: estimateCostEl ? estimateCostEl.textContent : "60 دولار"
    };
  }

  function setError(inputElement, msg) {
    const group = inputElement.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      const errEl = group.querySelector('.form-error-msg');
      if (errEl) errEl.textContent = msg;
    }
  }

  // بناء نص الطلب المرتب
  function formatOrderMessage(data) {
    const isJustInquiry = data.requestType.includes("استفسار");
    const headerTitle = isJustInquiry 
      ? "👋 السلام عليكم، أود الاستفسار حول خدمات تصميم المواقع:"
      : "👋 السلام عليكم، أود طلب خدمة تصميم وبرمجة موقع:";

    return [
      headerTitle,
      `━━━━━━━━━━━━━━━━━━`,
      `📌 نوع المراسلة: ${data.requestType}`,
      `👤 الاسم: ${data.name}`,
      `📞 وسيلة التواصل: ${data.contact}`,
      `🏢 نوع النشاط: ${data.businessType}`,
      `📦 الخدمة المطلوبة: ${data.service}`,
      `⏳ الموعد المستهدف: ${data.timeline}`,
      `💰 التكلفة المقدرة: ${data.estimatedPrice}`,
      `📝 التفاصيل والملاحظات:`,
      `${data.details}`,
      `━━━━━━━━━━━━━━━━━━`,
      `تم إرسال هذا الطلب عبر منصة "${config.siteName || 'خدماتي البرمجية'}"`
    ].join('\n');
  }

  // إرسال الطلب مباشرة إلى واتساب
  if (whatsappSubmitBtn) {
    whatsappSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = validateAndGetFormData();
      if (!data) return;

      const fullMessage = formatOrderMessage(data);
      const phone = config.contact?.whatsAppNumber || "966541821068";
      const targetUrl = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;

      // فتح نافذة واتساب
      window.open(targetUrl, '_blank');

      // إظهار بطاقة النجاح
      showSuccessCard(data);
    });
  }

  // إرسال عبر البريد الإلكتروني (إن وجد الزر)
  const emailSubmitBtn = document.getElementById('sendEmailBtn');
  if (emailSubmitBtn) {
    emailSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = validateAndGetFormData();
      if (!data) return;

      const email = config.contact?.email || "amoal2030@gmail.com";
      const subject = encodeURIComponent(`${data.requestType} - من ${data.name}`);
      const body = encodeURIComponent(formatOrderMessage(data));
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

      showSuccessCard(data);
    });
  }

  // نسخ التفاصيل إلى الحافظة
  if (copyDetailsBtn) {
    copyDetailsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = validateAndGetFormData();
      if (!data) return;

      const fullMessage = formatOrderMessage(data);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullMessage).then(() => {
          showToast("✓ تم نسخ تفاصيل الطلب بنجاح إلى الحافظة!");
        }).catch(() => {
          fallbackCopyText(fullMessage);
        });
      } else {
        fallbackCopyText(fullMessage);
      }
    });
  }

  function fallbackCopyText(text) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    showToast("✓ تم نسخ تفاصيل الطلب بنجاح!");
  }

  function showSuccessCard(data) {
    if (successCard) {
      successCard.classList.add('show');
      document.getElementById('successClientName').textContent = data.name;
      form.style.display = 'none';
    }
  }

  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'flex';
      if (successCard) successCard.classList.remove('show');
      updateEstimatedPrice();
    });
  }
}

/**
 * إشعار التوست الخفيف
 */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/**
 * إدارة الأكورديون للأسئلة الشائعة
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // إغلاق البقية
      faqItems.forEach(i => i.classList.remove('open'));
      // تبديل الحالي
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/**
 * دالة مساعدة لحماية النصوص من ثغرات الحقن (Sanitization)
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
