document.addEventListener("DOMContentLoaded", () => {
  // Determine text direction
  const bodyDir = window.getComputedStyle(document.body).direction;
  const dirAr = bodyDir === "rtl";

  // Scroll to the top of the page
  window.addEventListener("scroll", () => {
    document.getElementById("scrollUp").style.display =
      window.scrollY > 300 ? "block" : "none";
  });

  const select = document.querySelector(".form-select");
  if (select) {
    document.querySelectorAll("select").forEach(function (select) {
      const numberOfOptions = select.options.length;

      // إخفاء الـ <select> الأصلي
      select.classList.add("select-hidden");

      // إنشاء الهيكل الخاص بـ select-styled
      const wrapper = document.createElement("div");
      wrapper.classList.add("select");
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);

      const styledSelect = document.createElement("div");
      styledSelect.classList.add("select-styled");
      styledSelect.textContent = select.options[0].textContent;
      wrapper.appendChild(styledSelect);

      const optionsList = document.createElement("ul");
      optionsList.classList.add("select-options");
      wrapper.appendChild(optionsList);

      // إضافة الخيارات إلى القائمة المخصصة
      Array.from(select.options).forEach((option, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = option.textContent;
        listItem.setAttribute("rel", option.value);
        optionsList.appendChild(listItem);

        if (option.selected) {
          listItem.classList.add("is-selected");
        }
      });

      const listItems = optionsList.querySelectorAll("li");

      // عند الضغط على العنصر المخصص
      styledSelect.addEventListener("click", function (e) {
        e.stopPropagation();
        document
          .querySelectorAll("div.select-styled.active")
          .forEach(function (activeStyledSelect) {
            if (activeStyledSelect !== styledSelect) {
              activeStyledSelect.classList.remove("active");
              activeStyledSelect.nextElementSibling.style.display = "none";
            }
          });

        styledSelect.classList.toggle("active");
        optionsList.style.display = styledSelect.classList.contains("active")
          ? "block"
          : "none";
      });

      // عند اختيار عنصر من القائمة
      listItems.forEach(function (listItem) {
        listItem.addEventListener("click", function (e) {
          e.stopPropagation();
          styledSelect.textContent = listItem.textContent;
          styledSelect.classList.remove("active");

          select.value = listItem.getAttribute("rel");

          optionsList
            .querySelectorAll("li.is-selected")
            .forEach(function (selectedItem) {
              selectedItem.classList.remove("is-selected");
            });
          listItem.classList.add("is-selected");

          optionsList.style.display = "none";

          // يمكنك إضافة أي شيء هنا مثل: console.log(select.value);
        });
      });

      // عند الضغط خارج العنصر
      document.addEventListener("click", function () {
        styledSelect.classList.remove("active");
        optionsList.style.display = "none";
      });
    });
  }

  $(".features .owl-carousel").owlCarousel({
    nav: false,
    center: true,
    responsiveClass: true,
    margin: 0,
    loop: true,
    items: 1,
    nav: true,
    navText: [
      `<span class="next"><i class="bi bi-arrow-right"></i></i></span>`,
      `<span class="prev"><i class="bi bi-arrow-left"></i></span>`,
    ],
    dots: false,
    autoplay: true,
    animateOut: "fadeOut",
    rtl: dirAr,
  });

  $(".testimonials .owl-carousel").owlCarousel({
    nav: false,
    center: true,
    responsiveClass: true,
    margin: 16,
    loop: true,
    items: 3,
    nav: true,
    navText: [
      `<span class="next"><i class="bi bi-arrow-right"></i></i></span>`,
      `<span class="prev"><i class="bi bi-arrow-left"></i></span>`,
    ],
    dots: false,
    autoplay: true,
    animateOut: "fadeOut",
    rtl: dirAr,
    responsive: {
      0: {
        items: 1.4,
      },
      1200: {
        items: 3,
      },
    },
  });

  var $pricingCarousel = $(".pricing .owl-carousel");
  var pricingItemsCount = $pricingCarousel.find(".card").length; // عدد العناصر
  // تعطيل السحب لو العناصر 3 أو أقل
  const allowDrag = pricingItemsCount > 3;
  $pricingCarousel.owlCarousel({
    nav: false,
    loop: false,
    dots: true,
    responsiveClass: true,
    margin: 16,
    rtl: dirAr,
    responsive: {
      0: {
        items: 1.2,
        center: true,
        loop: true,
        autoplay: true,
      },
      768: {
        items: 1.4,
        center: true,
        loop: true,
        autoplay: true,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 3,
        mouseDrag: allowDrag,
        touchDrag: allowDrag,
      },
    },
  });

  new WOW().init();
});
