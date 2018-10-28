let contactList = createMockData(30);

$(document).ready(() => {
  $('.btn.add').on('click', () => {});
  insertContactItems(contactList);
});

function createMockData(counter) {
  let contactListMock = [];
  for (let i = 0; i <= counter; i++) {
    faker.seed(i + 1);
    let contactItem = {
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
  contactList.forEach(listItem => {
    $('.contact-list').append(` <div class="margin20"> ${listItem.name}  ${listItem.surname}<hr> </div>`);
  });
}
