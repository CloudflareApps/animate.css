(function(){
  if (!document.querySelectorAll || !document.addEventListener)
    return;

  var options = INSTALL_OPTIONS;

  var boundEvents = [];
  var addedAnimations = {};

  var load = function(){
    var elements = options.elements;

    for (var i=0; i < boundEvents.length; i++){
      var e = boundEvents[i];

      e[0].removeEventListener(e[1], e[2]);
    }

    boundEvents = [];

    if (document.body.classList){
      // Only used by the preview, so it's ok to use classList here

      for (var selector in addedAnimations){
        var els = document.querySelectorAll(selector);
        if (!els) continue;

        var prevAdded = addedAnimations[selector];

        for (var j=0; j < els.length; j++){
          els[j].classList.remove('animated');
          els[j].classList.remove('infinite');

          for (var k=0; k < prevAdded.length; k++){
            els[j].classList.remove(prevAdded[k]);
          }
        }
      }
    }

    addedAnimations = {};

    for (var i=0; i < elements.length; i++){
      (function(i){


        var els = document.querySelectorAll(elements[i].selector);
        if (!els) return;

        addedAnimations[elements[i].selector] = [];

        var cls = " animated";
        if (elements[i].loop) {
          cls += " infinite";
        }
        cls += " " + elements[i].animation;
        addedAnimations[elements[i].selector].push(elements[i].animation);

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

        var handler;

        switch (elements[i].when){
        case "page-load":
          for (var j=0; j < els.length; j++){
            trigger(j);
          }

          break;
        case "hover":
          for (var j=0; j < els.length; j++){
            (function(j){
              els[j].addEventListener('mouseover', handler = function(){
                reset(j);
                trigger(j);
              });

              boundEvents.push([els[j], 'mouseover', handler]);

              els[j].addEventListener('mouseout', handler = function(){
                reset(j);
              });

              boundEvents.push([els[j], 'mouseout', handler]);
            })(j)
          }

          break;
        case "click":
          for (var j=0; j < els.length; j++){
            (function(j){
              els[j].addEventListener('click', handler = function(){
                reset(j);
                trigger(j);
              });

              boundEvents.push([els[j], 'click', handler]);
            })(j)
          }

          break;
        }
      })(i);
    }
  };

  var setOptions = function(opts) {
    options = opts;

    load();
  };

  if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }

  window.EagerAnimate = {
    setOptions: setOptions
  };
})()
