document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.bullet-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.parentElement.querySelector('.bulletLanding-content');
            const isOpening = !content.classList.contains('show');
            
            if (isOpening) {
                document.querySelectorAll('.bulletLanding-content.show').forEach(openContent => {
                    if (openContent !== content) {
                        openContent.classList.remove('show');
                        openContent.closest('.bulletLanding')
                            .querySelector('.bullet-header')
                            .classList.remove('active');
                    }
                });
                
                setTimeout(() => {
                    content.classList.add('show');
                    this.classList.add('active');
                }, 50);
            } else {
                content.classList.remove('show');
                this.classList.remove('active');
            }
        });
    });
});