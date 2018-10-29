let contactList = createMockData(33).sort(function(a, b) {
  let nameA = a.name.toUpperCase();
  let nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

$(document).ready(() => {
  hideEditableMode();
  $('.btn.add').on('click', () => {
    showAddContact();
  });

  $('#addContactForm').submit(function(event) {
    insertNewContactItem($(this).serializeArray());
    insertContactItems(contactList);
    alert('Handler for .submit() called.');
    $('.input-content input').val('');
    hideEditableMode();
    event.preventDefault();
  });

  $('.contact-list').on('click', '.contact-item', function() {
    showContactDetail(findElement(contactList, $(this).data().contactId));
  });

  $('input.search').on('keyup', function() {
    insertContactItems(filterElement(contactList, $('input.search').val()));
  });

  insertContactItems(contactList);
  $('input.search').val('');
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
      email: faker.internet.email(),
      id: i
    };
    contactListMock.push(contactItem);
  }
  return contactListMock;
}

function insertContactItems(contactList) {
  let myNewItem = '';
  contactList.forEach(listItem => {
    myNewItem += ` <div class="contact-item margin20" data-contact-id="${listItem.id}"> ${listItem.name}  ${
      listItem.surname
    }<hr> </div>`;
  });
  $('.contact-list').html(myNewItem);
}

function insertNewContactItem(newContact) {
  const myNewContact = {};
  newContact.forEach(inputItem => {
    myNewContact[inputItem.name] = inputItem.value;
  });
  myNewContact.id = contactList.length;
  contactList.push(myNewContact);
}

function hideEditableMode() {
  $('.contact-details .input-content').addClass('hide');
  $('button.btn.save').addClass('hide');
}

function showContactDetail(contact) {
  const template = `
  <div class="margin20">
  <div class="input-name" data > <span class="margin20">Name: </span> <span>${contact.name}</span>
  <hr>
  </div>
<div class="input-name"> <span class="margin20">Surname: </span> <span>${contact.surname}</span>
  <hr>
</div>
<div class="input-name"> <span class="margin20">Phone number:</span> <span>${contact.phoneNumber}</span>
  <hr>
</div>
<div class="input-name"><span class="margin20"> Address street: </span> <span>${contact.street}</span>
  <hr>
</div>
<div class="input-name"><span class="margin20"> City & zipcode: </span> <span>${contact.city}</span>
  <hr>
</div>
<div class="input-name"><span class="margin20"> Email: </span> <span>${contact.email}</span>
<hr>
</div>
</div>`;

  $('.content.contact-details').html(template);
}

function showAddContact() {
  const template = `  <form id="addContactForm" class="contact-item margin20">
  <div class="input-name"> <span class="margin20">Name: </span>
      <hr>
  </div>
  <div class="input-content"> <input required name="name" />
      <hr>
  </div>
  <div class="input-name"> <span class="margin20">Surname: </span>
      <hr>
  </div>
  <div class="input-content"> <input required name="surname" />
      <hr>
  </div>
  <div class="input-name"> <span class="margin20">Phone number:</span>
      <hr>
  </div>
  <div class="input-content"> <input required name="phoneNumber" />
      <hr>
  </div>
  <div class="input-name"><span class="margin20"> Address street: </span>
      <hr>
  </div>
  <div class="input-content"> <input required name="street" />
      <hr>
  </div>
  <div class="input-name"><span class="margin20"> City & zipcode: </span>
      <hr>
  </div>
  <div class="input-content"> <input required name="city" />
      <hr>
  </div>
  <div class="input-name"><span class="margin20"> Email: </span>
      <hr>
  </div>
  <div class="input-content"> <input required name="email">
      <hr>
  </div>
  <button class="btn save" type="submit">save</button>
</div>
</form>`;

  $('.content.contact-details').html(template);
}

function findElement(contactList, contactId) {
  return contactList.find(contact => {
    return contact.id == contactId;
  });
}

function filterElement(contactList, searchStr) {
  uppercasedSearch = searchStr.toUpperCase();
  return contactList.filter(element => {
    return (
      element.name.toUpperCase().includes(uppercasedSearch) |
      element.surname.toUpperCase().includes(uppercasedSearch) |
      element.email.toUpperCase().includes(uppercasedSearch)
    );
  });
}
