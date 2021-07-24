// Fetch the items from the JSON file
function loadItems() {
    // fetch라는 함수로 data를 가져온다.
    return fetch('data/data.json')
       // 받아온 data가 성공적이면 json으로 변환
      .then(response => response.json())
      // json안에있는 items를 리턴하게 된다.
      .then(json => json.items);
  }
  
  // Update the list with the given items
  function displayItems(items) {
    const container = document.querySelector('.items');
    // itmes를 이용해서 cntainer의 innerHTML을 이용해서 받아온 items를 <li> 그룹으로 만들어서 container에 추가
                                    // createHTMLString()함수를 사용해서 li요소로 문자열로 만든다.
    // const html = items.map(item => createHTMLString(item)).join('');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');// 문자열 배열을 한가지 문자열로 만들기
    // 한가지의 배열을 다른 형태의 배열로 매핑할 때 : map 사용하기
    // console.log(html);
  }
  
  // 문자열 배열 만들기
  // Create HTML list item from the given data item
  function createHTMLString(item) {
    return `
      <li class="item">
          <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
          <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
      `;
  }
  
  // on이 붙은 함수는 이벤트 발생 함수로 많이 쓴다.
  // Handle button click
  function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    console.log(key);
    console.log(value);
  
    if (key == null || value == null) {
      return;
    }
    displayItems(items.filter(item => item[key] === value));

    // updateItems(items, key, value);
  }

  /*
    // Make the items matching {key: value} invisible.
  function updateItems(items, key, value) {
    items.forEach(item => {
      if (item.dataset(key) === value) {
        item.classList.remove('invisible');
      } else {
        item.classList.add('invisible');
      }
    });
  }
  */
  
  function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
  }
  
  // main
  loadItems()
    .then(items => {
      displayItems(items);
      setEventListeners(items);
    })
    .catch(console.log);
  