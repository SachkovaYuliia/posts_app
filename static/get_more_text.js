document.addEventListener('DOMContentLoaded', function() {
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const fullPost = this.nextElementSibling;
        if (fullPost.classList.contains('collapse')) {
          fullPost.classList.remove('collapse');
          this.textContent = 'Show Less';
        } else {
          fullPost.classList.add('collapse');
          this.textContent = 'Read More';
        }
      });
    });
  });