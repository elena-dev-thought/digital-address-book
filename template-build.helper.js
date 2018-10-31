function showContactDetail(contact) {
  const template = `
    <div class="margin20 content-item">
    <div> <span>Name: </span>
    </div>
    <div>
        <span>${contact.name}</span>
    </div>
    <div> <span>Surname: </span>
    </div>
    <div>
        <span>${contact.surname}</span>
    </div>
    <div> <span>Phone number:</span>
    </div>
    <div>
        <span>${contact.phoneNumber}</span>
    </div>
    <div><span> Address street: </span>
    </div>
    <div>
        <span>${contact.street}</span>
    </div>
    <div><span> City & zipcode: </span>
    </div>
    <div>
        <span>${contact.city}</span>
    </div>
    <div><span> Email: </span>
    </div>
    <div>
        <span>${contact.email}</span>
    </div>
    <button class="btn toolbar-element delete"> <i class="fa fa-trash"></i>delete</button>
  </div>`;
  $('.content.contact-details').html(template);
}

function showAddContact() {
  const template = `  <form id="addContactForm" class="contact-item-form margin20">
    <div> <span>Name: </span>
    </div>
    <div class="input-content"> <input type="text" required name="name" />
    </div>
    <div> <span>Surname: </span>
    </div>
    <div class="input-content"> <input type="text" required name="surname" />
    </div>
    <div> <span>Phone number:</span>
    </div>
    <div class="input-content"> <input type="tel" required name="phoneNumber" />
    </div>
    <div><span> Address street: </span>
    </div>
    <div class="input-content"> <input type="text" required name="street" />
    </div>
    <div><span> City & zipcode: </span>
    </div>
    <div class="input-content"> <input type="text" required name="city" />
    </div>
    <div><span> Email: </span>
    </div>
    <div class="input-content"> <input type="email" required name="email">
    </div>
    <button class="btn save toolbar-element" type="submit"> <i class="fa fa-save"></i>save</button>
  </form>`;

  $('.content.contact-details').html(template);
}
