let contactList = createMockData(3);

$(document).ready(() => {
  hideEditableMode();
  $('.btn.add').on('click', () => {
    $('.contact-details .input-content').removeClass('hide');
    $('button.btn.save').removeClass('hide');
  });

  $('input').attr('required', true);

  $('#addContactForm').submit(function(event) {
    insertNewContactItem($(this).serializeArray());
    insertContactItems(contactList);
    alert('Handler for .submit() called.');
    $('.input-content input').val('');
    hideEditableMode();
    event.preventDefault();
  });

  insertContactItems(contactList);
});

function createMockData(counter) {
  let contactListMock = [];
  for (let i = 0; i <= counter; i++) {
    faker.seed(i + 1);
    contactItem = {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      phoneNumber: faker.phone.phoneNumber(),
      street: faker.address.streetAddress(),
      city: faker.fake('{{address.streetAddress}}, {{address.zipCode}}, {{address.city}}'),
      email: faker.internet.email()
    };
    contactListMock.push(contactItem);
  }
  return contactListMock;
}

function insertContactItems(contactList) {
  let myNewItem = '';
  contactList.forEach(listItem => {
    myNewItem += ` <div class="margin20"> ${listItem.name}  ${listItem.surname}<hr> </div>`;
  });
  $('.contact-list').html(myNewItem);
}

function insertNewContactItem(newContact) {
  const myNewContact = {};
  newContact.forEach(inputItem => {
    myNewContact[inputItem.name] = inputItem.value;
  });
  contactList.push(myNewContact);
}

function hideEditableMode() {
  $('.contact-details .input-content').addClass('hide');
  $('button.btn.save').addClass('hide');
}
