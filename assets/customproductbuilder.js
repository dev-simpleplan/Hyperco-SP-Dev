document.body.addEventListener('CPB_ON_PRODUCT_MOUNTED', function(event) {
    document.querySelector('.Polaris-Button').innerHTML = '<span class="Polaris-Button__Content"><span>Socks</span>';
    // $('.cpb-product-full-price').attr('id','full-price'); // does not work for some reason
    document.querySelector('.cpb-product-full-price').id = 'full-price';
   console.log('hey');
  });
  
  ;($ => {
  const arrowRight = `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z" fill="#666666"/>
  </svg>`
  const globals = {}
  function initGlobals() {
    globals.builder = $('#product-builder')
    globals._productQuantity = 5
    globals.changeProductQuantity = number => {
      globals._productQuantity = number
      globals.builder[0].dispatchEvent(new Event('productQuantityChanged'))
      addCssVariable(globals.builder.closest('.shopify-block'), '--cpb-custom-product-quantity', number)
    }
    document.body.addEventListener('CPB_ON_OPTIONS_UPDATE', () => {
      globals.changeProductQuantity(CPB.getStore().getState().Product.quantity)
    })
  }
  function topBar() {
    const tabList = $('.react-tabs__tab-list').eq(0)
    const customSteps = []
    create()
    new MutationObserver(() => {
      const tabs = tabList.find('.react-tabs__tab')
      tabs.each(function(i) {
        const realStep = $(this)
        const stepIsActive = realStep.hasClass('cpb-active')
        customSteps[i]?.toggleClass('active', stepIsActive)
        if(stepIsActive) {
          setActiveTabIndexes(i, tabs.length)
        }
      })
    }).observe(tabList[0], {subtree: true, attributes: true, attributeFilter: ['class']})
    
    function create() {
      const top = $('<div class="cpb-custom-top-bar-top">')      
      const bottom = $('<div class="cpb-custom-top-bar-bottom">')
      globals.topBar = bottom
      const backBtn = $('<button class="cpb-custom-back-btn" aria-label="back">').html('&#x2039;')
      const customTitle = $('<h1 class="cpb-custom-product-title">')
      const stepsWrapper = $('<div class="cpb-custom-steps">')      
      const actions = $('<div class="cpb-custom-actions">')
      const save = $('<button class="cpb-custom-save cpb-custom-btn">').text('Save Progress')
      const prev = $('<button class="cpb-custom-prev cpb-custom-btn">').html('<span class="arrow">&#x2039;</span> Previous')
      const next = $('<button class="cpb-custom-next cpb-custom-btn">').html('Next <span class="arrow">&#x203A;</span>')
      const realPrevNext = $('.cpb-panels-container .cpb-next-tab-button')
  
      saveInit(save)
  
      backBtn.on('click', function() {
        history.back()
      })
  
      prev.on('click', function() {
        realPrevNext.eq(0).trigger('click')
        window.scrollTo({top: 0, behavior: 'smooth'})
      })
      next.on('click', function() {
        realPrevNext.eq(1).trigger('click')
        window.scrollTo({top: 0, behavior: 'smooth'})
      })
  
      const title = globals.builder.find('.cpb-product-title')
      if(title.length) {
        top.append(backBtn, customTitle.text(title.text()))
      }
  
      const tabs = tabList.find('.react-tabs__tab')
      tabs.each(function(i) {
        const realStep = $(this)
        const step = $('<button class="cpb-custom-step">').text(realStep.text())
        const stepIsActive = realStep.hasClass('cpb-active')
        step.toggleClass('active', stepIsActive)
        if(stepIsActive) setActiveTabIndexes(i, tabs.length)
        step.on('click', function() {
          realStep.trigger('click')
        })
        customSteps.push(step)
        if(i > 0) stepsWrapper.append($('<div class="cpb-custom-separator">').html(arrowRight))
        stepsWrapper.append(step)
      })
      
      bottom.append(stepsWrapper, actions)
      actions.append(save, prev, next)
      globals.builder.prepend(top, bottom).attr('data-custom-top-bar', true)
    }
    function saveInit(saveButton) {
      const formWrapper = $('#cpb-custom-email-form')
      const input = formWrapper.find('input[placeholder="productUrl"]')
      const closeBtn = formWrapper.find('.cpb-custom-email-form__close')
      input.closest('.globo-form-control').hide()
  
      saveButton.on('click', async function() {
        let configId = window._cpb.saveConfig(null, false) 
        if(configId instanceof Promise) configId = await configId
        const url = removeQueryStringParameter(window.location.href, 'modifyProduct')
        input.val(updateQueryStringParameter(url, 'configid', configId))
        formWrapper.addClass('opened')
      })
      closeBtn.on('click', function() {
        formWrapper.removeClass('opened')
      })
    }
    function setActiveTabIndexes(current, of) {
      globals.builder.attr('data-active-tab-index', current)
      globals.builder.attr('data-active-tab-index-from-end', of - current - 1)
    }
  }
  function collapsibleOptions() {
    let check = true
    
    $(document).on('click', '.cpb-category-title', function(e) {
      if(!check) return
      const item = $(this)
      if(item.parent().hasClass('cpb-category-collapse-active')) {
        $('.cpb-category-collapse-active .cpb-category-title').each(function() {
          if(this === item[0]) {
            return
          }
          check = false
          $(this).find('.cpb-category-title__inner').trigger('click');
          window.dispatchEvent(new Event('resize'));
          check = true
        })
      }
    })
  }
  function customActions() { // requires top bar
    const actionsWrapper = $('<div class="cpb-custom-actions-bottom">')    
    const actionsLine1 = $('<div class="cpb-custom-actions-bottom__line line-1">')
    const actionsLine2 = $('<div class="cpb-custom-actions-bottom__line line-2">')
    const reset = $('<button class="cpb-custom-reset-btn cpb-custom-btn">').text('Reset')
    const priceWrapper = $('<div class="cpb-custom-product-price-wrapper">')
    const price = $('<div class="cpb-custom-product-price">')
    const pricePerPlayer = $('<div class="cpb-custom-product-price-per-player">')
    const addToCart = $('<button class="cpb-custom-add-to-cart-btn cpb-custom-btn">').text('Add To Cart')    
  
    const realReset = $('.cpb-reset-button')
    const realPrice = $('.cpb-product-price').eq(0)
    const realAddToCart = $('.cpb-add-to-cart-button')
  
    const priceTemplate = (() => {
      const priceText = realPrice.text()
      const priceNoSigns = priceText.match(/[\d\.\s,]+/)[0] // updated (included spaces)
      return priceText.replace(priceNoSigns, '{{ price }}')
    })()
  
    // requires top bar
    const save = $('<button class="cpb-custom-save cpb-custom-btn">').text('Save Progress').on('click', () => {
      $('.cpb-custom-top-bar-bottom .cpb-custom-save').trigger('click')
    })
    const prev = $('<button class="cpb-custom-prev cpb-custom-btn">').html('<span class="arrow">&#x2039;</span> Previous').on('click', () => {
      $('.cpb-custom-top-bar-bottom .cpb-custom-prev').trigger('click')
    })
    const next = $('<button class="cpb-custom-next cpb-custom-btn">').html('Next <span class="arrow">&#x203A;</span>').on('click', () => {
      $('.cpb-custom-top-bar-bottom .cpb-custom-next').trigger('click')
    })
  
    reset.on('click', function() {
      realReset.trigger('click')
    })
    addToCart.on('click', function() {
      if(canAddToCart()) realAddToCart.trigger('click')
    })
  
    updatePrice()
    new MutationObserver(() => {
      // console.log('real price changed', realPrice[0], realPrice.text())
      updatePrice()
    }).observe(realPrice[0], {subtree: true, characterData: true})
    globals.builder[0].addEventListener('productQuantityChanged', updatePrice)
  
    priceWrapper.append(pricePerPlayer, price)
    actionsWrapper.append(actionsLine1, actionsLine2)
    actionsLine1.append(save, prev, next)
    actionsLine2.append(reset, priceWrapper, addToCart)
    $('.cpb-product-actions').last().append(actionsWrapper)
    globals.builder.attr('data-custom-actions', true)
  
    function canAddToCart() {
      if(window.cpbcWholesale.filledIn === false) {
          window.cpbcWholesale.highlightFieldsToFill()
          alert('Please fill in all the player details')
          return false
      }
      return true
    }
    function updatePrice() {
      const priceText = realPrice.text()
      const priceNumber = +priceText.replaceAll(/\s/g, '').match(/[\d\.,]+/)[0].replace(',', '');
      price.text(priceText)
      pricePerPlayer.text(priceTemplate.replace('{{ price }}', (priceNumber / globals._productQuantity).toFixed(2)))
    }
  }
  function customWholesale() {
      let input = null
      document.body.addEventListener('CPB_ON_UPDATE_CURRENT_TAB', () => {
          const category = $('.custom-wholesale--js')
          input = category.find('textarea')
          tryWriteToInput()
      })
      let timeout
      document.body.addEventListener('CPBC_WHOLESALE_PLAYERS_DATA_UPDATED', tryWriteToInput)
      function tryWriteToInput() {
          if(!input || input.length === 0) return
          clearTimeout(timeout)
          timeout = setTimeout(() => {
              _triggerEventOnInput(input[0], window.cpbcWholesale.playersDataString, 'input')
          }, 300)  
      }
  }
  function _triggerEventOnInput(elem, enteredValue, eventName) {
    var input = elem;
    var lastValue = input.value;
    input.value = enteredValue;
    var event = new Event(eventName, { bubbles: true });
    var tracker = input._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
  }
  function removeQueryStringParameter(uri, key) {
    if(uri.includes(key) === false) return uri
    const match = (() => {
      if(uri.includes(`?${key}`)) return uri.match(new RegExp(`${key}[=]*[^&]*&*`))
      else return uri.match(new RegExp(`&${key}[=]*[^&]*`))
    })()
    return uri.replace(match, '')
  }
  function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        var hash = '';
        if(uri.indexOf('#') !== -1 ){
            hash = uri.replace(/.*#/, '#');
            uri = uri.replace(/#.*/, '');
        }
    
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        return uri + separator + key + "=" + value + hash;
    }
  }
  function addCssVariable($element, variableName, variableValue) {
    let styleText = $element.attr('style') || ''
    if(styleText.includes(variableName) === false) {
      styleText += `${variableName}:${variableValue}; `
    } else {
      const regexp = new RegExp(`${variableName}[^;]+;`)
      styleText = styleText.replace(regexp, `${variableName}:${variableValue};`)
    }
    $element.attr('style', styleText)
  }
  async function fixProductLoadWrongPriceBug() {
    const product = CPB.getStore().getState().Product
    let category
    const panel = product.panels.find(panel => {
      category = panel.categories.find(category => category.extraClassName.includes('player-quantity--js'))
      return !!category
    })
    if(!category) return
    const option = category.options[0]
    option.option.data.value = product.quantity
    const getFrontendApi = await CPB.FrontendApi()
  const FrontendApi = new getFrontendApi()
    FrontendApi.updateOptions({
        panel,
        category,
        options: [option]
    })
  }
  
  document.body.addEventListener('CPB_ON_PRODUCT_MOUNTED', () => {
    // if (location.search.includes('cpbPreview')) return // test
    initGlobals()
    topBar()
    collapsibleOptions()
    customActions()
    customWholesale()
    fixProductLoadWrongPriceBug();
  });

  })(jQuery)

  
  
  ;(function($) {
    document.body.addEventListener('CPB_ON_PRODUCT_MOUNTED', init);
    
    function init() {
      modifyProductInCartInit();
    }
    
    function modifyProductInCartInit() {
      if(window.location.search.indexOf('&modifyProduct=') === -1) return;
      var keyId = window.location.search.split('&modifyProduct=')[1];
      keyId = keyId.split('&')[0];
      var addToCartBtn = $('.cpb-add-to-cart-button');
      addToCartBtn.find('span').html('Update Cart');
      addToCartBtn.on('click', function() {
        $.get('/cart/change.js', {
          'id': keyId,
          'quantity': 0
        });
      });
    }
  
  })(jQuery);
  
  //scroll to top when personalize button clicked
  const scrollToTopWhenCPBOpen = () => {
    const button = document.getElementsByClassName('personalize-it--js ')[0];
    button.addEventListener('click', () => scroll(0, 0));
  }
  document.addEventListener("DOMContentLoaded", scrollToTopWhenCPBOpen);
  