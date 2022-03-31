export function switchScrollbar(className:string){
  if (!className) return;
  const elementWithClass = document.querySelector(`.${className}`);
  if (elementWithClass){
    elementWithClass.addEventListener('mouseenter', function(){
      elementWithClass.classList.add("showScrollbar");
    });            
    elementWithClass.addEventListener('mouseleave', function(){
      elementWithClass.classList.remove("showScrollbar");
    });
  }
}
