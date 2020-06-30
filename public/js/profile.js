//console.log('test');

$(document).ready(() => {
    $.get("/current-user/", (details) => {
        //console.log(data);
        $('#username').html(details.username),
            $('#email').html(details.email)
    }).fail(function (error) {
        console.log(error)
    })
});


/*
const button = document.querySelector('input');
const paragraph = document.querySelector('p');

button.addEventListener('click', updateButton);

function updateButton() {
  if (button.value === 'Register') {
    button.value = 'Stop machine';
    paragraph.textContent = 'The machine has started!';
  } else {
    button.value = 'Start machine';
    paragraph.textContent = 'The machine is stopped.';
  }
}*/

