'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var userOpen = document.querySelector('.setup-open');
  var userClose = document.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  // var userSubmit = userDialog.querySelector('.setup-submit');
  var userForm = userDialog.querySelector('.setup-wizard-form');

  // запоминаем начальные  координаты диалогового окна
  var userDialogcoords = {
    x: 500,
    y: 80
  };

  // вешаем обработчики
  var onPopupEscPress = function (evt) {
    if (userNameInput !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    userDialog.style.top = userDialogcoords.y + 'px';
    userDialog.style.left = userDialogcoords.x + 'px';
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  userOpen.addEventListener('click', openPopup);

  userOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  userOpen.addEventListener('focus', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  userClose.addEventListener('click', closePopup);

  userClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  userClose.addEventListener('focus', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function (inputEvt) {
      inputEvt.preventDefault();
      userNameInput.blur();
    });
  });

  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  userOpen.addEventListener('click', openPopup);

  userOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  userOpen.addEventListener('focus', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  userClose.addEventListener('click', closePopup);

  userClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  userClose.addEventListener('focus', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  // найдем элемент, за который будем тащить диалог
  var dialogHandle = userDialog.querySelector('.upload');

  // обработаем событие начала перетаскивания диалога
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // запомним координаты точки, с которой начали перемещать диалог
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // для решения конфликта между обработчиком перетаскивания диалога и выбора файла заводим новую переменную

    var dragged = false;

    // при каждом движении мыши нужно обновлять смещение относительно первоначальной точки, чтобы диалог смещался на необходимую величину
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    // при отпускании кнопки мыши перестаем слушать события движения мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // при отпускании мыши вешаем обработчик на click, который отменяет действие по умолчанию, если перемещение имело место
      if (dragged) {
        var onClickPreventDefailt = function (evtClick) {
          evtClick.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefailt);
        };
        dialogHandle.addEventListener('click', onClickPreventDefailt);
      }
    };

    // добавим обработчики на передвижение и отпускание кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  // найдем элемент инвентаря из магазина
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  // при отправке формы используем функцию save и отменяем действие по умолчанию, диалог закроется, как только данные будут успешно сохранены
  userForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(userForm), successHandler, errorHandler);
    evt.preventDefault();
  });

  // обработка успешной отправки формы
  var successHandler = function () {
    userDialog.classList.add('hidden');
  };

  // обработка ошибок
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.dialog = {

  };
})();
