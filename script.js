
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        smoothScrollTo(targetSection.offsetTop, 1000); // 1000 milliseconds (1 second) for smooth scroll
      }
    });
  });
 // Function for smooth scroll
 function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function scrollAnimation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

    if (timeElapsed < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  requestAnimationFrame(scrollAnimation);
}

  // effect hover card item

  const cardItems = document.querySelectorAll('.card-item');
  const cardButton = document.querySelectorAll('.card-item button');
  const buttonHero = document.querySelectorAll('.buttonHover');

  buttonHero.forEach(function(Item) {
    Item.addEventListener('mouseover', function() {
       
      this.style.background = ' #007BFF';
      this.style.color = 'white';
    });

    Item.addEventListener('mouseout', function() {
        this.style.background = 'none';
        this.style.color = ' #007BFF';
    });
  });

  cardButton.forEach(function(buttonItem) {
    buttonItem.addEventListener('mouseover', function() {
      this.style.background = ' #007BFF';
      this.style.color = 'white';
    });

    buttonItem.addEventListener('mouseout', function() {
        this.style.background = 'none';
        this.style.color = ' #007BFF';
    });
  });

    
  
  cardItems.forEach(function(cardItem) {
    cardItem.addEventListener('mouseover', function() {
      this.style.border = '2px solid  #007BFF';
    });

    cardItem.addEventListener('mouseout', function() {
      this.style.border = '1px solid #ccc';
    });
  });

 
  const counters = document.querySelectorAll(".counter");

    window.addEventListener("scroll", function () {
        counters.forEach((counter) => {
            const rect = counter.getBoundingClientRect(); // trả về object có kích thước và vị trí của phần tử trong trang web.
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                // Nếu counter hiển thị trên màn hình (ít nhất một phần)
                animateCounter(counter, 1000); // 1000 là giá trị muốn nhảy đến
            }
        });
        // Effect nhảy số
        function animateCounter(counter, targetValue) {
          let currentValue = 0;
          const increment = Math.ceil(targetValue / 100); // Chia targetValue thành 100 phần
          const animationSpeed = 10; // Tốc độ animation
  
          const updateCounter = () => {
              currentValue += increment;
              if (currentValue >= targetValue) {
                  currentValue = targetValue;
                  clearInterval(interval);
              }
              counter.textContent = currentValue;
          };   
          const interval = setInterval(updateCounter, animationSpeed);
          counter.classList.add("show"); // Hiển thị counter bằng cách thêm class "show"
      }


        const options = {
            root: null, // Sử dụng viewport làm root
            rootMargin: '0px',
            threshold: 0.2, // Khi 20% của phần tử nằm trong tầm nhìn
        };
        
        const observer = new IntersectionObserver((entries, observer) => { 
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Nếu phần tử nằm trong tầm nhìn
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target); // Ngừng quan sát sau khi hiển thị
                }
            });
        }, options);
        
        document.querySelectorAll('.check-item').forEach(item => {
            observer.observe(item);
        });
        document.querySelectorAll('.contact-section').forEach(item => {
            observer.observe(item);
        });

    });

  
});

// SLIDER LOGO INFINITE 
let copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);

// RATE SECTION 
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');
let cards = document.querySelectorAll('.card-items');
let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    let last_active_card = document.querySelector('.card-items.active');
    last_active_dot.classList.remove('active');
    last_active_card.classList.remove('active');
    dots[active].classList.add('active');
    cards[active].classList.add('active');
    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};


// CONTACT SECTION 

// COUT DOWN 
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const currentYear = new Date().getFullYear();

const newTime = new Date(`October 30 ${currentYear} 00:00:00`);
// Run countdown
setInterval(updateCountdown, 1000);

// Update countdown time
function updateCountdown() {
	const currentTime = new Date();
	const diff = newTime - currentTime;

	const d = Math.floor(diff / 1000 / 60 / 60 / 24);
	const h = Math.floor(diff / 1000 / 60 / 60) % 24;
	const m = Math.floor(diff / 1000 / 60) % 60;
	const s = Math.floor(diff / 1000) % 60;

	days.innerHTML = d;
	hours.innerHTML = h < 10 ? '0' + h : h;
	minutes.innerHTML = m < 10 ? '0' + m : m;
	seconds.innerHTML = s < 10 ? '0' + s : s;

  if(d <= 0 & h <= 0 && m <= 0 && s <= 0 ) {
    days.innerHTML = '0';
    hours.innerHTML = '0';
    minutes.innerHTML = '0';
    seconds.innerHTML = '0';

  }
}


const form = document.getElementById('registrationForm');
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const submitButton = document.getElementById('submitButton');

        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');

        const successMessage = document.getElementById('successMessage');

        let checkUSer, checkEmail, checkPhone;
        // Function to validate username
        function validateUsername() {
            const usernameRegex = /^[za-zA-Z0-9_]{8,}$/;
            const isValid = usernameRegex.test(usernameInput.value);
            checkUSer = isValid;
            usernameInput.style.border = isValid ? '1px solid blue' : '1px solid red';
            showError(usernameError, !isValid, 'Invalid username');
            checkFormValidity();
        }

        // Function to validate email
        function validateEmail() {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            const isValid = emailRegex.test(emailInput.value);
            checkEmail = isValid;
            emailInput.style.border = isValid ? '1px solid blue' : '1px solid red';
            showError(emailError, !isValid, 'Invalid email');
            checkFormValidity();
        }

        // Function to validate phone number
        function validatePhone() {
            const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
            const isValid = phoneRegex.test(phoneInput.value);
            checkPhone = isValid;
            phoneInput.style.border = isValid ? '1px solid blue' : '1px solid red';
            showError(phoneError, !isValid, 'Invalid phone number');
            checkFormValidity();
        }

            // Function to show error message 
        function showError(element, condition, message) {
            element.textContent = condition ? message : '';
        }

        // Function to check overall form validity
        function checkFormValidity() {
            const isValid = checkUSer && checkEmail && checkPhone;
            // submitButton.disabled = !isValid;
          
            if (isValid) {
              // If all fields are valid, show success message and hide submit button
              submitButton.addEventListener('click', ()=>{
                successMessage.style.display = 'block';
                submitButton.style.display = 'none';
                  clearValueInput();
              });
            } else {
              
              successMessage.style.display = 'none';
              submitButton.style.display = 'block';

            }
          }
          const clearValueInput = () => {
              usernameInput.value = '';
              console.log("123123132");
              emailInput.value = '';
              phoneInput.value = '';

          }

          
          submitButton.addEventListener('click', () =>{
                  showError(usernameError, true, 'Username not null!');
            
            if (!checkUSer || !checkEmail || !checkPhone) {
              // Check for each input separately
              if (usernameInput.value === "") {
                  showError(usernameError, true, 'Username not null!');
              }
              if (emailInput.value === "") {
                  showError(emailError, true, 'Email not null!');
              }
              if (phoneInput.value === "") {
                  showError(phoneError, true, 'Phone not null!');
              }
          } else {
              // If all inputs are non-empty, clear error messages
              showError(usernameError, true, '');
              showError(emailError, true, '');
              showError(phoneError, true, '');
          }
          });
        // Event listeners for input validation
        usernameInput.addEventListener('input', validateUsername);
        emailInput.addEventListener('input', validateEmail);
        phoneInput.addEventListener('input', validatePhone);
