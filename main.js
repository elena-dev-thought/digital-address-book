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
  <div class="margin20 content-item">
  <div> <span>Name: </span>
  </div>
  <div>
      <span >${contact.name}</span>
  </div>
  <div > <span>Surname: </span>
  </div>
  <div>
      <span >${contact.surname}</span>
  </div>
  <div > <span>Phone number:</span>
  </div>
  <div>
      <span >${contact.phoneNumber}</span>
  </div>
  <div ><span> Address street: </span>
  </div>
  <div>
      <span >${contact.street}</span>
  </div>
  <div ><span> City & zipcode: </span>
  </div>
  <div>
      <span >${contact.city}</span>
  </div>
  <div ><span> Email: </span>
  </div>
  <div>
      <span   >${contact.email}</span>
  </div>
  <button class="btn delete toolbar-element">delete</button>
</div>`;
  $('.content.contact-details').html(template);
}

function showAddContact() {
  const template = ` <form id="addContactForm" class="contact-item-form margin20">
  <div > <span>Name: </span>
  </div>
  <div class="input-content"> <input required name="name" />
  </div>
  <div class="input-name"> <span>Surname: </span>
  </div>
  <div class="input-content"> <input required name="surname" />
  </div>
  <div class="input-name"> <span>Phone number:</span>
  </div>
  <div class="input-content"> <input required name="phoneNumber" />
  </div>
  <div class="input-name"><span> Address street: </span>
  </div>
  <div class="input-content"> <input required name="street" />
  </div>
  <div class="input-name"><span> City & zipcode: </span>
  </div>
  <div class="input-content"> <input required name="city" />
  </div>
  <div class="input-name"><span> Email: </span>
  </div>
  <div class="input-content"> <input required name="email">
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
