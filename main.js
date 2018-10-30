let contactList = sortArrayAscending(createMockData(33));

$(document).ready(() => {
  initialize();

  $('.btn.add').on('click', () => {
    showAddContact();
  });
  $('.contact-details').on('submit', '#addContactForm', function(event) {
    insertNewContactItem($(this).serializeArray());
    contactList = sortArrayAscending(contactList);
    insertContactItems(contactList);
    $('.input-content input').val('');
    event.preventDefault();
  });

  $('.contact-list').on('click', '.contact-item', function() {
    $('.contact-item').removeClass('selected');
    let id = $(this).data().contactId;
    $(this).addClass('selected');
    showContactDetail(findElement(contactList, id));
  });

  $('input.search').on('keyup', function() {
    insertContactItems(filterElement(contactList, $('input.search').val()));
  });

  $('.contact-details').on('click', ' .btn.delete', function() {
    let selectedId = $('.selected').data().contactId;
    contactList = deleteContact(contactList, selectedId);
    insertContactItems(contactList);
    $('.contact-item:first').click();
  });
});

function initialize() {
  insertContactItems(contactList);
  showContactDetail(contactList[1]);
  $('.contact-item:first').addClass('selected');
  $('input.search').val('');
}

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
    myNewItem += `<div class="contact-item margin20" data-contact-id="${listItem.id}"> ${listItem.name}  ${
      listItem.surname
    } </div>`;
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
  console.log(contactList);
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
<button class="btn delete toolbar-element">delete</button>
</div>
</div>`;

  $('.content.contact-details').html(template);
}

function showAddContact() {
  const template = `  <form id="addContactForm" class="contact-item margin20" action="#">
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
  <button class="btn save toolbar-element" type="submit">save</button>
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
      element.name
        .toUpperCase()
        .concat(' ', element.surname.toUpperCase())
        .includes(uppercasedSearch) | element.email.toUpperCase().includes(uppercasedSearch)
    );
  });
}

function deleteContact(contactList, selectedId) {
  return contactList.filter(element => element.id !== selectedId);
}

function sortArrayAscending(arr) {
  return arr.sort(function(a, b) {
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
}
