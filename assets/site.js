(function(){
  'use strict';
  async function copyText(id,button){
    var target=document.getElementById(id);var status=button.nextElementSibling;if(!target){return;}
    var text=(target.innerText||target.textContent||'').trim();
    try{
      if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);}
      else{var area=document.createElement('textarea');area.value=text;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();if(!document.execCommand('copy')){throw new Error('copy failed');}area.remove();}
      status.textContent='コピーしました';
    }catch(e){status.textContent='コピーできませんでした。文章を選んでコピーしてください。';}
  }
  document.querySelectorAll('[data-copy]').forEach(function(button){button.addEventListener('click',function(){copyText(button.getAttribute('data-copy'),button);});});
  var form=document.getElementById('request-builder');
  if(form){form.addEventListener('submit',function(event){event.preventDefault();var task=document.getElementById('task-name').value.trim()||'仕事';var material=document.getElementById('task-material').value.trim()||'材料';var output=document.getElementById('task-output').value.trim()||'完成物と保存先';var check=document.getElementById('task-check').value.trim()||'確認する所';document.getElementById('custom-template').textContent='次の作業をお願いします。\n作業内容：'+task+'\n使う材料：'+material+'\n完成物と保存先：'+output+'\n確認する所：'+check+'\n原本は変えず、完成物は上の保存先へ保存してください。\n最後に、保存先と確認結果を教えてください。';document.getElementById('builder-result').hidden=false;document.getElementById('builder-result').scrollIntoView({behavior:'smooth',block:'center'});});}
  var printButton=document.getElementById('print-button');if(printButton){printButton.addEventListener('click',function(){window.print();});}
})();
