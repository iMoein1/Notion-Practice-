    function cleanString(str) {
      return str.replace(/\d/g, '').trim().replace(/\s+/g, ' ');
    }
    function cleanFriends(str) {
      return str.split(',').map(name => cleanString(name)).filter(Boolean);
    }
    
    function attachInputListeners() {
        const textInputs = ['firstName', 'lastName', 'job', 'friends'];
        textInputs.forEach(id => {
            const inputElement = document.getElementById(id);
            if (inputElement) {
                inputElement.addEventListener('input', function() {
                    const originalValue = this.value;
                    const cleanedValue = cleanString(originalValue);
                    if (originalValue !== cleanedValue) {
                        this.value = cleanedValue;
                    }
                });
            }
        });
    }

    document.addEventListener('DOMContentLoaded', attachInputListeners);

    document.getElementById('generateBtn').addEventListener('click', function() {
      const firstName = cleanString(document.getElementById('firstName').value);
      const lastName = cleanString(document.getElementById('lastName').value);
      const birthYear = parseInt(document.getElementById('birthYear').value);
      const job = cleanString(document.getElementById('job').value);
      const friends = cleanFriends(document.getElementById('friends').value);
      const hasDriversLicense = document.getElementById('hasDriversLicense').checked;

      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = ''; 

      if (!firstName || !lastName || !birthYear || !job) {
        outputDiv.innerHTML = '<p class="text-red-500 font-bold text-center">لطفا تمام فیلدها را پر کنید.</p>';
        return;
      }

      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      function calcAge(birthYear) {
        return currentYear - birthYear;
      }

      function yearsUntilRetirement(birthYear, firstName) {
        const age = calcAge(birthYear);
        const retirementAge = 65;
        const yearsLeft = retirementAge - age;
        
        if (yearsLeft > 0) {
          return `${firstName} ${yearsLeft} سال دیگر بازنشست می‌شود.`;
        } else {
          return `${firstName} از قبل بازنشست شده است!`;
        }
      }

      let friendInfo = '';
      if (friends.length > 0) {
        friendInfo += `<p class="mt-2">اولین دوست: <span class="font-bold">${friends[0]}</span></p>`;
        friendInfo += `<p>آخرین دوست: <span class="font-bold">${friends[friends.length - 1]}</span></p>`;
      } else {
        friendInfo = `<p class="mt-2">لیست دوستان خالی است.</p>`;
      }

      const person = {
        firstName: firstName,
        lastName: lastName,
        birthYear: birthYear,
        job: job,
        friends: friends,
        hasDriversLicense: hasDriversLicense, 

        calcAge: function() {
          return new Date().getFullYear() - this.birthYear;
        },

        getSummary: function() {
          let summary = `${this.firstName} یک ${this.calcAge()}-ساله ${this.job} است و ${this.friends.length} دوست دارد.`;
          
          if (this.hasDriversLicense) {
            summary += " و گواهینامه رانندگی دارد.";
          } else {
            summary += " و گواهینامه رانندگی ندارد.";
          }
          return summary;
        }
      };

      let outputHTML = `
        <h2 class="text-lg font-bold text-indigo-700 mb-2">خلاصه پروفایل</h2>
        <p>سن شما: <span class="font-bold">${person.calcAge()} سال</span></p>
        <p>${yearsUntilRetirement(birthYear, firstName)}</p>
        <p class="mt-4">${person.getSummary()}</p>
        ${friendInfo}
      `;
      outputDiv.innerHTML = outputHTML;
    });