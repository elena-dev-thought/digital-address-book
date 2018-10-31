let contactList = sortArrayAscending(createMockData(33));

$(document).ready(() => {
  $('.btn.add').on('click', () => {
    $('.contact-item').removeClass('selected');
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

  initialize();
});

function initialize() {
  insertContactItems(contactList);
  $('.contact-item:first').click();
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
