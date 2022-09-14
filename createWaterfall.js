 /**
  * 
  * @param {HTMLDivElement} rootNode: the block which is the parent to all of the elements in waterfall
  * @param {number} columnCount: the number of columns
  * @param {number} elementGap: gaps in px between all elements from the different sides
  */

export function createWaterfall(rootNode, columnCount, elementGap) {

    rootNode.style.display = 'flex';
    rootNode.style.flexWrap = 'wrap';
    rootNode.style.alignItems = 'flex-start';
    rootNode.style.columnGap = px(elementGap);

    const widthRootNode = parseFloat(style(rootNode).width);
    const widthEl = (widthRootNode - (elementGap *(columnCount-1))) / columnCount;

    const elems = rootNode.children;
   
    for (let i = 0; i < elems.length; ++i){
            elems[i].style.boxSizing = 'border-box';
            elems[i].style.width = px(widthEl);
    }
  
    calculateMargins();


    //functions:
    
    function calculateMargins (){
        if(columnCount === 1) {
            for (let i = 0; i < elems.length; ++i){
                elems[i].style.marginTop = '';
            }
            return false;
        }
        
        for (let i = 0; i < elems.length; ++i){
            console.log(i);
            elems[i].style.marginTop = '';
    
            if(i < columnCount) {
                continue;
            }
    
            const topEl = elems[i - columnCount];
            const topElPos = topEl.getBoundingClientRect().top;

            const topHeight =  getHeightAndMarginBottom(topEl);

            const bottomPos = topElPos + topHeight;
 
            const elPos =  elems[i].getBoundingClientRect().top;

    
            let setPos = elPos.toFixed(0) - bottomPos.toFixed(0);

            if(setPos === 0) {
                elems[i].style.marginTop = px(elementGap);
                continue;
            }
            setPos -= elementGap;
            setPos = '-' + setPos + 'px';
            elems[i].style.marginTop = setPos;
    
        }
        return true;
    }


    function getHeightAndMarginBottom(elm) {
        const height = elm.getBoundingClientRect().height;
        const styles = style(elm);
        const bottom = parseFloat(styles.marginBottom);
        return height + bottom;
    }

    function style (el) {
        return window.getComputedStyle(el);
    }

    function px (n) { return parseFloat(n) + 'px'; }
      
 }


