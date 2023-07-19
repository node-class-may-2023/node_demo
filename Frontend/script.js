// fetch is promise [pending, reject, accept]

const fetchBtn = document.querySelector('#fetch-btn');
const abortBtn = document.querySelector('#abort-btn');

const controller = new AbortController();
fetchBtn.addEventListener('click', async () => {
  const options = {
    method: 'GET',
    signal: controller.signal
    // headers: {
    // 	authorization: 'apikey here'
    // }
  };

  const timer = setTimeout(() => {
    controller.abort();
    console.log('request aborted');
  }, 1500);

  try {
    const response = await fetch('http://localhost:3000/longwait', options);
    const data = await response.json();
    clearTimeout(timer);
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
});

abortBtn.addEventListener('click', () => {
  controller.abort();
  console.log('request aborted');
});

// abort signal
