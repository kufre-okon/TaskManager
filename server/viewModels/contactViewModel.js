const ContactViewModel = {

    listViewModel(contact) {     
        return {
            firstName: contact.firstName,
            lastName: contact.lastName,
            emailAddress: contact.emailAddress,
            mobilePhone: contact.mobilePhone,
            jobTitle: contact.jobTitle,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            notes: contact.notes,
            active: contact.active,
            avatarUrl: contact.avatarUrl,
            country: contact.country.name
        }
    }
}

export default ContactViewModel;