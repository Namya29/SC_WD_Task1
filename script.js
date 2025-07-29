  // Preloader
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });

        // Mobile Menu Toggle
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');

        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.querySelector('i').classList.toggle('fa-times');
        });

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            navbar.classList.toggle('scrolled', window.scrollY > 50);

            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            backToTop.classList.toggle('active', window.scrollY > 300);
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuBtn.querySelector('i').classList.remove('fa-times');
                    }
                }
            });
        });

        // Animation on Scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.feature-card, .about-image, .about-content, .stat-item, .project-card, .testimonial-card, .contact-item, .contact-form');
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight / 1.2;
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                
                if (elementPosition < triggerPoint) {
                    element.classList.add('animated');
                }
            });
        }

        // Initialize animations on page load
        window.addEventListener('load', () => {
            animateOnScroll();
            window.dispatchEvent(new Event('scroll'));
        });

        // Animate elements when scrolling
        window.addEventListener('scroll', animateOnScroll);

        // Counter Animation for Stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.textContent;
                const increment = target / speed;
                
                if(count < target) {
                    counter.textContent = Math.ceil(count + increment);
                    setTimeout(animateCounters, 1);
                } else {
                    counter.textContent = target;
                }
            });
        }

        // Start counter animation when stats section is in view
        const statsSection = document.querySelector('.stats');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);

        // Animate skill bars when about section is in view
        const aboutSection = document.querySelector('#about');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = document.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillObserver.observe(aboutSection);

        // LinkedIn Share Button
        document.querySelector('.fa-linkedin-in').addEventListener('click', (e) => {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const title = "Check out my tech portfolio project - TechNova Solutions";
            const summary = "I built this responsive tech portfolio website with animations and interactive elements as part of my learning journey.";
            const source = encodeURIComponent("TechNova Portfolio");
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        });