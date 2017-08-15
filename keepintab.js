function removeTargetIfNotFrame(element)
{
    let currentTarget = element.getAttribute("target");
    if (currentTarget && (currentTarget[0] === '_')) {
        element.removeAttribute("target");
    }
}

function removeTargetAttributes(parent)
{
    Array.from(parent.querySelectorAll("a[target]")).forEach(removeTargetIfNotFrame);
}

// Create an observer instance
let observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
        if (m.type === "attributes" && m.target.hasAttribute("target")) {
            removeTargetIfNotFrame(m.target);
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
