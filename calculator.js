// Calculator functionality for simplified home finishing estimation
document.addEventListener('DOMContentLoaded', function() {
  // Price database
  const prices = {
    // Price per square meter for each finishing type
    finishing: {
      // NOTE: Keep these numbers in sync with the labels shown in calculator.html
      basic: 3500,      // EGP per m²
      standard: 5000,   // EGP per m²
      premium: 7500     // EGP per m²
    },
    
    // Property type multipliers
    propertyType: {
      apartment: 1.0,   // Base multiplier
      duplex: 1.2,      // 20% more expensive than apartment
      villa: 1.5,       // 50% more expensive than apartment
      townhouse: 1.3    // 30% more expensive than apartment
    },
    
    // Fixed bathroom cost
    bathroom: 90000     // 90,000 EGP per bathroom
  };

  // Get DOM elements
  const calculateBtn = document.getElementById('calculate-btn');
  const totalArea = document.getElementById('total-area');
  const propertyType = document.getElementById('property-type');
  const bathrooms = document.getElementById('bathrooms');
  const finishingOptions = document.querySelectorAll('input[name="finishing"]');
  const costAmount = document.querySelector('.cost-amount');
  
  // Summary elements
  const summaryType = document.getElementById('summary-type');
  const summaryArea = document.getElementById('summary-area');
  const summaryFinishing = document.getElementById('summary-finishing');
  const summaryBathrooms = document.getElementById('summary-bathrooms');
  
  // Breakdown elements
  const breakdownItems = document.querySelectorAll('.breakdown-value');
  
  // Buttons
  const saveEstimate = document.getElementById('save-estimate');
  const printEstimate = document.getElementById('print-estimate');
  const consultationBtn = document.getElementById('consultation-btn');

  // Get selected finishing option
  function getSelectedFinishing() {
    for (const option of finishingOptions) {
      if (option.checked) {
        return option.value;
      }
    }
    return 'basic'; // Default value
  }

  // Calculate estimate
  function calculateEstimate() {
    // Get values from form
    const area = parseFloat(totalArea.value) || 0;
    const propertyTypeValue = propertyType.value;
    const bathroomCount = parseInt(bathrooms.value) || 0;
    const finishingType = getSelectedFinishing();
    
    // Calculate costs
    const baseCost = area * prices.finishing[finishingType];
    const propertyMultiplier = prices.propertyType[propertyTypeValue];
    const adjustedBaseCost = baseCost * propertyMultiplier;
    const bathroomCost = bathroomCount * prices.bathroom;
    const totalCost = adjustedBaseCost + bathroomCost;
    
    // Property type display names
    const propertyNames = {
      apartment: 'Apartment',
      duplex: 'Duplex',
      villa: 'Villa',
      townhouse: 'Townhouse'
    };
    
    // Finishing type display names
    const finishingNames = {
      basic: 'Basic Finishing',
      standard: 'Standard Finishing',
      premium: 'Premium Finishing'
    };
    
    // Update display
    costAmount.textContent = Math.round(totalCost).toLocaleString();
    
    // Update summary
    summaryType.textContent = propertyNames[propertyTypeValue];
    summaryArea.textContent = area;
    summaryFinishing.textContent = finishingNames[finishingType];
    summaryBathrooms.textContent = bathroomCount;
    
    // Update breakdown
    breakdownItems[0].textContent = Math.round(baseCost).toLocaleString() + ' EGP';
    breakdownItems[1].textContent = '×' + propertyMultiplier.toFixed(1) + ' = ' + Math.round(adjustedBaseCost).toLocaleString() + ' EGP';
    breakdownItems[2].textContent = Math.round(bathroomCost).toLocaleString() + ' EGP';
    breakdownItems[3].textContent = Math.round(totalCost).toLocaleString() + ' EGP';
  }

  // Save estimate
  saveEstimate.addEventListener('click', function() {
    const estimate = {
      date: new Date().toLocaleDateString(),
      cost: costAmount.textContent,
      area: totalArea.value,
      propertyType: propertyType.options[propertyType.selectedIndex].text,
      bathrooms: bathrooms.value,
      finishing: document.querySelector('input[name="finishing"]:checked').parentNode.querySelector('h4').textContent
    };
    
    // Save to localStorage
    let estimates = JSON.parse(localStorage.getItem('elLeithyEstimates')) || [];
    estimates.push(estimate);
    localStorage.setItem('elLeithyEstimates', JSON.stringify(estimates));
    
    alert('Estimate saved successfully!');
  });

  // Print estimate
  printEstimate.addEventListener('click', function() {
    window.print();
  });

  // Schedule consultation
  consultationBtn.addEventListener('click', function() {
    alert('Thank you for your interest! Our team will contact you within 24 hours to schedule a consultation.');
  });

  // Calculate on page load and button click
  calculateBtn.addEventListener('click', calculateEstimate);
  calculateEstimate(); // Calculate on page load
  
  // Update estimate when inputs change
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('change', calculateEstimate);
  });
  
  // Update estimate when finishing option changes
  finishingOptions.forEach(option => {
    option.addEventListener('change', calculateEstimate);
  });
});