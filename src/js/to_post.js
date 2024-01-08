

// токен в ajax запросе на основе coocies присланной пользователем
// var csrfCookie = document.cookie.match(/CSRF-TOKEN=([\w-]+)/);
// if (csrfCookie) {
//    request.setRequestHeader("X-CSRF-TOKEN", csrfCookie[1]);
//  }




(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // находим форму с forms вешаем событие
    const form = document.querySelectorAll('.form');

    if (form.length) {
      //добавляем событие при отправке
      form.forEach(el => {
        el.addEventListener('submit', formSend);
      });
    }

    async function formSend(e) {
      const loading_circle = document.getElementById('load-circle');
      // запрещаем стандартную отправку
      e.preventDefault();

      let formData = new FormData(this);
      // formData.append('image', formImage.files[0]);

      const formDataObj = {};
      formData.forEach((value, key) => (formDataObj[key] = value));
      console.log(formDataObj);
      // const formDataObj = Object.fromEntries(myFormData.entries());

      // var formData = new FormData();
      // data.append("json", JSON.stringify(myData));

      // form.classList.add('_sending');
      if (loading_circle) {
        loading_circle.classList.remove('hidden');
      };
      // отправляем данные из формы ajax
      try {
        let response = await fetch('/send-email', {
          method: 'POST',
          body: JSON.stringify(formDataObj),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          let result = await response.json();
          console.log(result);
          loading_circle.classList.add('hidden');
          const send_mess = document.getElementById('send-message');
          send_mess.classList.remove('hidden');
          setTimeout(() => send_mess.classList.add('hidden'), 3000);
          this.reset();

        } else {
          let result = await response.text();
          console.log(result);
          // form.classList.remove('_sending');
          loading_circle.classList.add('hidden');
          const not_send_mess = document.getElementById('not-send-message');
          not_send_mess.classList.remove('hidden');
          setTimeout(() => not_send_mess.classList.add('hidden'), 3000);
          e.reset();
        }
      } catch (e) {
        if (loading_circle) {
          loading_circle.classList.add('hidden');
        };
        console.log(e);
      } finally {
        console.log('send post finally');
      }
    }
  });
})();




/*

"use strict"

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelectorAll('.form');
  form.forEach(el => {
    el.addEventListener('submit', formSend);
  });


  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      // .form__body{position:relative}
      // .form__body::after{
      //  content:'';
      //  position: absolute;
      //  top: 0;
      //  left: 0;
      //  width: 100%;
      //  height: 100%;
      //  background: rgba(51,51,51,0.8) url('../img/loading.gif' center / 50px no-repeat);
      //  opacity: 0;
      //  visibility: hidden;
      //  transition: all 0.5s easy 0s;
      //}

      // .form__body.sending::after {
      //  opacity: 1;
      //  visibility: visible;
      // }
      let responnse = await fetch('send-email', {
        method: 'POST',
        body: formData
      });

      if (responnse.ok) {
        let result = await responnse.json();
        alert(result.message);
        // formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');

      } else {
        alert('error');
        form.classList.remove('_sending');
      }

    } else {
      alert('plese write fild');
    }
  }


  // function formValidate(form) {
  //   let error = 0;

  //   let formReq = document.querySelectorAll('._req');

  //   for (let index = 0; index < formReq.length; index++) {
  //     const input = formReq[index];
  //     formRemoveError(input);

  //     if (input.classList.contains('_email')) {
  //       if (emailTest(input)) {
  //         formAddError(input);
  //         error++;
  //       }
  //     } else if (input.getAttribute('type') === 'checkbox' &&
  //       input.cheked == false) {
  //       formAddError(input);
  //       error++;
  //     } else {
  //       if (input.value === '') {
  //         formAddError(input);
  //         error++;
  //       }
  //     }
  //   }

  //   return error;
  // }

  // function formAddError(input) {
  //   input.parentElement.classList.add('_error')
  //   input.classList.add('_error');
  // }

  // function formRemoveError(input) {
  //   input.parentElement.classList.remove('_error')
  //   input.classList.remove('_error');
  // }

  // function emailTest(input) {
  //   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  // }
})

*/
