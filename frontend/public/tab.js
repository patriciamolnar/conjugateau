window.addEventListener('DOMContentLoaded', setup); 

function setup() {
    //No Focus Style until user starts tabbing
  document.body.addEventListener('keyup', function(e) {
      if (e.key === 'Tab') {
        document.documentElement.classList.remove('no-focus-outline');
      }
  });
}