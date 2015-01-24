(function(){
  if (!document.querySelectorAll || !document.addEventListener)
    return;

  var elements = INSTALL_OPTIONS.elements;

  for (var i=0; i < elements.length; i++){
    (function(i){

      var els = document.querySelectorAll(elements[i].selector);
      if (!els) return;

      var cls = " animated";
      if (elements[i].loop) {
        cls += " infinite";
      }
      cls += " " + elements[i].animation;

      var trigger = function(j){
        els[j].className += cls;

        if (!elements[i].loop){
          setTimeout(function(){
            reset(j);
          }, 1000);
        }
      }
      var reset = function(j){
        els[j].className = els[j].className.replace(cls, '');
      }

      switch (elements[i].when){
      case "page-load":
        for (var j=0; j < els.length; j++){
          trigger(j);
        }

        break;
      case "hover":
        for (var j=0; j < els.length; j++){
          (function(j){
            els[j].addEventListener('mouseover', function(){
              reset(j);
              trigger(j);
            });
            els[j].addEventListener('mouseout', function(){
              reset(j);
            });
          })(j)
        }

        break;
      case "click":
        for (var j=0; j < els.length; j++){
          (function(j){
            els[j].addEventListener('click', function(){
              reset(j);
              trigger(j);
            });
          })(j)
        }

        break;
      }
    })(i);
  }
})()
