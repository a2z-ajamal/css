/**
 * Deftform Gift Aid Logic
 * Handles the visibility of address fields based on the toggle switch
 */

(function() {
    const giftAidToggleId = 'ga-checkbox';
    
    // Unique wire:key identifiers for the address field containers
    const fieldKeys = [
        'fields.7626f5c4-12e3-4f08-a8e3-89a9ce517709',
        'fields.4178ec71-78ca-480c-9a01-480a35ccbfce',
        'fields.bf180f2e-6bb4-4db7-880b-84101b94003a',
        'fields.581bc44a-dda4-4ac4-8ed4-f18d8895e9e5',
        'fields.5ce0a6f9-c82d-48ba-8524-a47d5714bec0'
    ];

    function updateAddressVisibility() {
        const toggle = document.getElementById(giftAidToggleId);
        
        // If the toggle element isn't present in the DOM yet, exit
        if (!toggle) return; 

        fieldKeys.forEach(key => {
            const container = document.querySelector(`[wire\\:key="${key}"]`);
            if (container) {
                // If the toggle is checked, show the fields (block). Otherwise, hide (none).
                // !important is used to override any default Livewire styles.
                container.style.setProperty('display', toggle.checked ? 'block' : 'none', 'important');
            }
        });
    }

    // Set up a MutationObserver to handle Deftform's dynamic page loading
    const observer = new MutationObserver(() => {
        updateAddressVisibility();
        
        // Ensure we attach the event listener to the toggle if it's newly rendered
        const toggle = document.getElementById(giftAidToggleId);
        if (toggle && !toggle.dataset.listenerAttached) {
            toggle.addEventListener('change', updateAddressVisibility);
            toggle.dataset.listenerAttached = "true";
        }
    });

    // Start observing the body for changes (page swaps, content updates)
    observer.observe(document.body, { childList: true, subtree: true });
})();