
document.addEventListener('DOMContentLoaded', function() {

  // const iframe = document.querySelector('iframe');
  // iframe.onload = () => {
  //     let hulkAppsLine = document.querySelector('.hulk-powered-wrapper .text-right');
  //   hulkAppsLine.setAttribute('style', 'display: none !important');
  //   console.log('iframe loaded');
    
  // };
  
  // const iframe = document.querySelector('iframe');
  // let element = iframe.contentWindow.document.getElementsByTagName("p")[0];
  // element.style.display = "none";

  //Attempting to create the View Details button inline with the other two buttons.
  
   // let button = document.createElement("button");
   // button.setAttribute('type', 'button');
   // button.setAttribute('class', 'cd_accordion');
   // button.innerHTML = `<span>View Details</span> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 20 12" fill="none"><path d="M1 1.57916L9.80141 10.3806L18.5478 1.63417" stroke="#202020" stroke-width="2"></path></svg>`;
   // let buttonArea = document.querySelectorAll('.cd_order-contact-clild .cd_row');
   // for (let i = 0; i < buttonArea.length; i++) {
   //   button.setAttribute('id', `btn_${i+2001}`);
   //   button.setAttribute('onclick', `accordion('cd_panel_'+'${i+2001}','btn_'+'${i+2001})'`)
   //   buttonArea[i].appendChild(button.cloneNode(true));
   //   console.log(buttonArea[i].appendChild(button));
   // }

  
// Determining the product name for each order. We can change the product image and hyperlink based on their order so that it shows/links back to the base Hockey Jersey page/product instead of the auto-generated product.
  
  let productNames = document.querySelectorAll('.cd_price-detail p:nth-child(2)');
  let productImageBlock = document.querySelectorAll('.cd_price-detail img');
  let urlTag = document.querySelectorAll('.cd_order_variant');
  let pointlessTableRows = document.querySelectorAll('.cd_table-1 tbody tr:nth-child(-n+2)');
  for (let i = 0; i < productNames.length; i++) {
    let productName = productNames[i].innerText;
    let productImage = productImageBlock[i];
    let productLink = urlTag[i];
    // Hiding the Order Status Page and empty Addresses lines:
    let pointlessRow = pointlessTableRows[i];
    pointlessRow.setAttribute('style', 'display: none');
    
    // if (productName === 'Ice Hockey Jersey') {
    //   productImage.setAttribute('src', 'https://cdn.shopify.com/s/files/1/0591/7966/3496/products/ffcc514b45cba756acdfc57f2d041290_1036c1e4-fc96-4e5e-97ae-641fabcc743d.png');
    //   productLink.setAttribute('href', '/products/ice-hockey-jersey');
    // } else {
    //   return;
    // }
  }    
}, false);
