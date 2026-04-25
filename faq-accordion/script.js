let activeIndex;

const items = document.querySelectorAll('.items');

items.forEach((item, index) => {
  const button = item.querySelector('button');

  button.addEventListener('click', function () {
    if (index !== activeIndex) {
      activeIndex = index;
    } else {
      activeIndex = null;
    }
    renderAccordion();
  });
});

function renderAccordion() {
  items.forEach((item, index) => {
    const text = item.querySelector('p');
    if (index === activeIndex) {
      text.style.height = text.scrollHeight + 'px';
      item.classList.add('active');
    } else {
      text.style.height = '0px';
      item.classList.remove('active');
    }
  });
}
