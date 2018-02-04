export default class KickStarterView {
    createItems(elements){
        const elementWrapper=this.createTag("div");
        this.addClass(elementWrapper,"mdl-grid");
        elements.forEach(function(element,i){
            elementWrapper.appendChild(this.createItem(element));
        }.bind(this));
        return elementWrapper;
    }
    createItem(item) {
        const gridWrapper = this.createTag("div");
        this.addClass(gridWrapper, "mdl-cell mdl-cell--4-col")
        const itemWrapper = this.createTag("div");
        this.addClass(itemWrapper, "demo-card-wide mdl-card mdl-shadow--2dp ");
        const titleWrapper = this.createTitle(item.title);
        const launchWrapper = this.createLaunch();
        launchWrapper.onclick = (event) => { this.handleLaunchClick(item.url) };
        itemWrapper.appendChild(titleWrapper);
        itemWrapper.appendChild(this.createBody(item))
        itemWrapper.appendChild(launchWrapper);
        gridWrapper.appendChild(itemWrapper);
        this.attachEventsItem(gridWrapper,item.url);
        return gridWrapper;
    }
    
    attachEventsItem(item,url) {
        item.onmouseenter = (event) => { this.handleMouseEnter(item, true) };
        item.onmouseleave = (event) => { this.handleMouseEnter(item, false) };
    }
    handleLaunchClick(srclink) {
        srclink = "https://www.kickstarter.com" + srclink;
        window.open(srclink)
    }
    handleMouseEnter(item,isMouseEnter) {
        let displayStyle = "none";
        if (isMouseEnter) {
            displayStyle = "block";
        }
        item.getElementsByClassName("kickstarter__card--launch")[0].style.display = displayStyle;
    }
    createTag(tag) {
        return document.createElement(tag);
    }
    addClass(element, className) {
        element.className = className;
    }
    createBody(item) {
        const bodyWrapper1 = this.createTag("div");
        this.addClass(bodyWrapper1, "kickstartercard__body");
        bodyWrapper1.appendChild(this.createNoOfBackers(item["num.backers"]))
        bodyWrapper1.appendChild(this.createAmountPledged(item["amt.pledged"], item.currency));
        bodyWrapper1.appendChild(this.createBy(item.by));
        const bodyWrapper2 = this.createTag("div");
        this.addClass(bodyWrapper2, "kickstartercard__body");
        bodyWrapper2.appendChild(this.createPercentageCompleted(item["percentage.funded"]));
        bodyWrapper2.appendChild(this.createLocation(item.location));
        bodyWrapper2.appendChild(this.createdEndDate(item["end.time"]));
        const bodyWrapper = this.createTag("div");
        bodyWrapper.appendChild(bodyWrapper1);
        bodyWrapper.appendChild(bodyWrapper2);
        return bodyWrapper;
    }
    createTitle(title) {
        const titleWrapper = this.createTag("div");
        this.addClass(titleWrapper, "mdl-card__title");
        const titleElement = this.createTag("h5");
        this.addClass(titleElement, "mdl-card__title-h5");
        titleElement.innerHTML = title;
        titleWrapper.appendChild(titleElement);
        return titleWrapper;
    }
    createLaunch() {
        const launchWrapper = this.createTag("button");
        this.addClass(launchWrapper, "mdl-button mdl-js-button mdl-button--fab mdl-button--colored kickstarter__card--launch");
        const iconElement = this.createTag("i");
        this.addClass(iconElement, "material-icons");
        iconElement.innerHTML = "launch";
        launchWrapper.appendChild(iconElement);
        return launchWrapper;
    }
    createNoOfBackers(backersNumber) {
        const backersWrapper = this.createTag("div");
        this.addClass(backersWrapper, "mdl-card__backers kickstartercard__body-item");
        const backersDetails = this.createTag("span");
        backersDetails.innerHTML = backersNumber;
        const title = this.createBodyTitle("No of Backers")
        backersWrapper.appendChild(title);
        backersWrapper.appendChild(backersDetails);
        return backersWrapper;

    }
    createBodyTitle(title) {
        const titleElement = this.createTag("label");
        titleElement.innerHTML = title;
        this.addClass(titleElement, "kickstartercard__body-label")
        return titleElement;

    }
    createAmountPledged(amountPledged, currency) {
        const backersWrapper = this.createTag("div");
        this.addClass(backersWrapper, "mdl-card__amountpledged kickstartercard__body-item");
        const backersDetails = this.createTag("span");
        backersDetails.innerHTML = amountPledged;
        const currencyDetails = this.createTag("span");
        currencyDetails.innerHTML = currency;
        this.addClass(currencyDetails, "kickstartercard__currency-type")
        const title = this.createBodyTitle("Amount Pledged")
        backersWrapper.appendChild(title);
        backersWrapper.appendChild(backersDetails);
        backersWrapper.appendChild(currencyDetails);

        return backersWrapper;
    }
    createPercentageCompleted(percentageCompleted) {
        const backersWrapper = this.createTag("div");
        this.addClass(backersWrapper, "mdl-card__amountpledged kickstartercard__body-item");
        const backersDetails = this.createTag("span");
        backersDetails.innerHTML = percentageCompleted + "%";
        const title = this.createBodyTitle("% Funded")
        backersWrapper.appendChild(title);
        backersWrapper.appendChild(backersDetails);
        return backersWrapper;
    }
    createdEndDate(date) {
        const backersWrapper = this.createTag("div");
        this.addClass(backersWrapper, "mdl-card__amountpledged kickstartercard__body-item");
        const backersDetails = this.createTag("span");
        this.addClass(backersDetails, "kickstarter__card--date")
        backersDetails.innerHTML = new Date(date).toDateString();
        const title = this.createBodyTitle("End Date")
        backersWrapper.appendChild(title);
        backersWrapper.appendChild(backersDetails);
        return backersWrapper;
    }
    createBy(by) {
        const backersWrapper = this.createTag("div");
        this.addClass(backersWrapper, "mdl-card__amountpledged kickstartercard__body-item");
        const backersDetails = this.createTag("span");
        backersDetails.innerHTML = by;
        const title = this.createBodyTitle("By")
        this.addClass(backersDetails, "kickstarter__card--by")
        backersWrapper.appendChild(title);
        backersWrapper.appendChild(backersDetails);
        return backersWrapper;
    }
    createLocation(location) {
        const backersWrapper = this.createTag("div");
        this.addClass(backersWrapper, "mdl-card__amountpledged kickstartercard__body-item");
        const backersDetails = this.createTag("span");
        backersDetails.innerHTML = location;
        const title = this.createBodyTitle("Location")
        backersWrapper.appendChild(title);
        backersWrapper.appendChild(backersDetails);
        return backersWrapper;
    }
    loadLocations(locations,element,cb){
        locations.forEach(function(location){
           const liElement= this.createTag("li");
           this.addClass(liElement,"mdl-menu__item")
           liElement.innerHTML=location;
           liElement.onclick= (event)=>{
            const originalElement = event.srcElement || event.originalTarget;   
            cb(location,originalElement)};
           element.appendChild(liElement);
        }.bind(this))
    }
}