define(function(){return {render:function(map) {var p=[],v =[];for(var i in map) {p.push(i);v.push(map[i]);}return (new Function(p, "var _s=[];_s.push(' <div class=\"audio-inner-content\">  <div class=\"btn-row btn-nav\">  <a href=\"javascript:;\" data-action=\"dialogTab\" class=\"active\">音乐库</a>  <a href=\"javascript:;\" data-action=\"dialogTab\">外部链接</a>  </div>  <div class=\"content-row\">  <select name=\"audio\" data-action=\"audioSelect\">  <option value=\"\">选择音乐</option>  <option value=\"audio.mp3\">audio.mp3</option>  </select>  </div>  <div class=\"content-row\" style=\"display: none\">  <span>链接地址 </span>  <input type=\"text\" value=\"\" placeholder=\"请输入mp3文件链接\"/>  </div>  <div class=\"btn-row\">  <a href=\"javascript:;\" class=\"btn-ok\" data-action=\"audioDialogOk\">确定</a>  <a href=\"javascript:;\" class=\"btn-cancel\" data-action=\"audioDialogCancel\">取消</a>  </div> </div>'); return _s;")).apply(null, v).join("");}};});