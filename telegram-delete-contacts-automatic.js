(function deleteContacts() {
    const contactSelector = '.chatlist a';  // Selector for each contact's <a> tag
    let contacts = document.querySelectorAll(contactSelector);
    let index = 10;

    function deleteNextContact() {
        if (index >= contacts.length) {
            console.log('All contacts have been deleted');
            return;
        }

        // Get the contact element and extract the href link
        const contact = contacts[index];
        const contactLink = contact.getAttribute('href');

        if (contactLink) {
            // Navigate to the contact's profile by setting window.location.href
            window.location.href = `https://web.telegram.org/k/${contactLink}`;

            setTimeout(() => {
                // Step 1: Click the user info element to open profile
                const userInfoButton = document.querySelector('.chat-info .person');
                if (userInfoButton) {
                    userInfoButton.click();

                    setTimeout(() => {
                        // Step 2: Select the sidebar title and check if it contains "User Info"
                        const sidebarTitles = document.querySelectorAll('.sidebar-header__title');
                        let editButton = null;
                        
                        sidebarTitles.forEach((titleElement) => {
                            if (titleElement.textContent.includes("User Info")) {
                                // Get the next sibling button (Edit button)
                                editButton = titleElement.nextElementSibling;
                            }
                        });

                        if (editButton) {
                            editButton.click();

                            setTimeout(() => {
                                // Step 3: Find and click the delete contact button
                                const deleteButton = document.querySelector('.btn-primary.btn-transparent.danger');
                                if (deleteButton) {
                                    deleteButton.click();

                                    setTimeout(() => {
                                        // Step 4: Find and click the confirmation "Delete" button in the popup
                                        const confirmDeleteButton = document.querySelector('.popup-button.btn.danger');
                                        if (confirmDeleteButton) {
                                            confirmDeleteButton.click();
                                        }

                                        // Move to the next contact after confirming deletion
                                        setTimeout(() => {
                                            index++;
                                            deleteNextContact(); // Recursion to delete the next contact
                                        }, 1000);  // Adjust delay if necessary
                                    }, 500);  // Wait for the confirmation popup to appear
                                }
                            }, 500);  // Wait for the delete button to appear
                        }
                    }, 500);  // Wait for the user info panel to open
                }
            }, 1000);  // Wait for the profile to load
        }
    }

    deleteNextContact();
})();
