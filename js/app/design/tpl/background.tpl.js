define(function(){return {render:function(map) {var p=[],v =[];for(var i in map) {p.push(i);v.push(map[i]);}return (new Function(p, "var _s=[];_s.push(' <div class=\"bg-inner-content\">  <div class=\"btn-row clearfix\">  <a href=\"#\" data-action=\"dialogTab\" class=\"active\">纯色背景</a>  <a href=\"#\" data-action=\"dialogTab\" class=\" \">底纹边框</a>  <a href=\"#\" data-action=\"dialogTab\" class=\" \">商务教育</a>  <a href=\"#\" data-action=\"dialogTab\" class=\" \">自然风景</a>  </div>  <div class=\"content-row\">  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color1\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color2\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" data-action=\"bgModify\"  alt=\"\" class=\"color3\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color4\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color5\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color6\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color7\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color8\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color9\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color10\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color11\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color12\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color13\"/>  </div>  <div class=\"img-wrap\">  <img src=\"\" alt=\"\" data-action=\"bgModify\" class=\"color13\"/>  </div>  </div>  <div class=\"content-row\" style=\"display: none\">');for(var index=0; index<images.length;index+=1){var image=images[index];_s.push('  <div class=\"img-wrap\">  <img src=\"',image,'\" alt=\"\" data-action=\"bgModify\"/>  </div>');}_s.push('  </div>  <div class=\"content-row\" style=\"display: none\">');for(var index=0; index<images.length;index+=1){var image=images[index];_s.push('  <div class=\"img-wrap\">  <img src=\"',image,'\" alt=\"\" data-action=\"bgModify\"/>  </div>');}_s.push('  </div>  <div class=\"content-row\" style=\"display: none\">');for(var index=0; index<images.length;index+=1){var image=images[index];_s.push('  <div class=\"img-wrap\">  <img src=\"',image,'\" alt=\"\" data-action=\"bgModify\"/>  </div>');}_s.push('  </div> </div>'); return _s;")).apply(null, v).join("");}};});