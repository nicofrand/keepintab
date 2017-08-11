function removeTargetAttributes(parent)
{
    Array.from(parent.querySelectorAll("a[target]")).forEach(elt => {
        elt.removeAttribute("target");
    });
}

// Create an observer instance
let observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
        if (m.type === "attributes" && m.target.hasAttribute("target")) {
            m.target.removeAttribute("target");
        } else {
            removeTargetAttributes(m.target);
        }
    });
});

// Pass in the target node, as well as the observer options
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["target"]
});

removeTargetAttributes(document);
