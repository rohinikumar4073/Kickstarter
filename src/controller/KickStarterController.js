import ApiService from './../services/ApiService';
export default class KickStarterController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    initalise() {
        const kickStarterGetApi = "data/kickstarter.json"
        ApiService.getData(kickStarterGetApi).then(response => {
            this.model.loadData(JSON.parse(response));
            this.view.loadLocations(this.model.getLocations(),
                document.getElementById("filterList"),
                this.filterByLocation.bind(this));
            this.processLocalFilters();
        }).catch(error => {
            this.clearAndSetActive("ascPercFund");
            console.log("error", error)
        });
        this.attachEvents();
    }
    processLocalFilters() {
        const filterByLocationActive = localStorage.getItem("filterByLocationActive");
        const sortData = localStorage.getItem("sortData");
        if (filterByLocationActive || sortData){
            if(filterByLocationActive){
                this.filterByLocationActive=filterByLocationActive;
                this.setSticker("kickstarterfilter_location-active", filterByLocationActive);
            }
            if(sortData){
                this.sortData=JSON.parse(sortData);
                this.setSticker("kickstarterfilter_sort-active", JSON.parse(sortData).element);
            }
            this.renderData(this.model.filter("", this.filterByLocationActive, this.sortData));

        }else
            this.renderData(this.model.kickStarterData);

    }
    filterByLocation(location, element) {
        localStorage.setItem("filterByLocationActive", location);
        this.filterByLocationActive = location;
        this.clearAndSetActiveFilter(element);
        this.renderData(this.model.filter(this.searchVal, this.filterByLocationActive, this.sortData));
    }
    attachEvents() {
        this.attachSearchItem();
        this.attachSortByPercentageFunded();
        this.attachClearItems();
    }
    attachClearItems() {
        document.getElementById("kickstarterfilter_sort-active-button").onclick = (event) => {
            this.clearActive("sortList");
            localStorage.removeItem("sortData")

            this.sortData = null;
            document.getElementById("kickstarterfilter_sort-active").style.display = "none";
            this.renderData(this.model.filter(this.searchVal, this.filterByLocationActive, this.sortData));
        }
        document.getElementById("kickstarterfilter_location-active-button").onclick = (event) => {
            this.clearActive("filterList");
            localStorage.removeItem("filterByLocationActive")
            this.filterByLocationActive = "";
            document.getElementById("kickstarterfilter_location-active").style.display = "none";
            this.renderData(this.model.filter(this.searchVal, this.filterByLocationActive, this.sortData));
            document.getElementById("kickstarterfilter_location-active").style.display = "none";

        }
    }
    attachSortByPercentageFunded() {
        document.getElementById("ascPercFund").onclick = (event) => {
            this.clearAndSetActive("ascPercFund");
            this.handleClickPercFund("asc")
        }
        document.getElementById("descPercFund").onclick = (event) => {
            this.clearAndSetActive("descPercFund");
            this.handleClickPercFund("desc");
        }
        document.getElementById("ascByEndingDate").onclick = (event) => {
            this.clearAndSetActive("ascByEndingDate");
            this.handleClickSortBYDate("asc")
        }
        document.getElementById("descByEndingDate").onclick = (event) => {
            this.clearAndSetActive("descByEndingDate");
            this.handleClickSortBYDate("desc")
        }

    }
    clearAndSetActive(idOfElement) {
        this.clearActive("sortList");
        this.setSticker("kickstarterfilter_sort-active", document.getElementById(idOfElement).innerText);
        document.getElementById(idOfElement).classList.add("sortselected");
    }
    clearAndSetActiveFilter(element) {
        this.clearActive("filterList");
        this.setSticker("kickstarterfilter_location-active",element.innerText)
         element.classList.add("sortselected");
    }
   setSticker(tag,text){
        document.getElementById(tag).style.display = "inline-block";
        document.getElementById(tag+"-text").innerHTML = text;
       
    }
    clearActive(container) {
        if (document.getElementById(container)) {
            const currentActiveItem = document.getElementById(container).getElementsByClassName("sortselected");
            if (currentActiveItem.length > 0) {
                currentActiveItem[0].classList.remove("sortselected");
            }
        }


    }
    handleClickPercFund(sortBy) {
        const sortData = { sortBy: sortBy, element: "percentage.funded", type: "int" };
        this.sortData = sortData;
        localStorage.setItem("sortData", JSON.stringify(sortData));
        this.renderData(this.model.filter(this.searchVal, this.filterByLocationActive, this.sortData));
    }
    handleClickSortBYDate(sortBy) {
        const sortData = { sortBy: sortBy, element: "end.time", type: "date" };
        this.sortData = sortData;
        localStorage.setItem("sortData", JSON.stringify(sortData));
        this.renderData(this.model.filter(this.searchVal, this.filterByLocationActive, this.sortData));
    }
    attachSearchItem() {
        const searchDom = document.getElementById("searchForm");
        searchDom.onsubmit = (event) => {
            this.filterData(document.getElementById("sample6").value.toUpperCase());
            event.preventDefault()
        }
    }
    filterData(searchVal) {
        this.searchVal = searchVal;
        this.renderData(this.model.filter(this.searchVal, this.filterByLocationActive, this.sortData));
    }
    renderData(elements) {
        const kickstarterdat = document.getElementById("kickstarter-data");
        const elementTags = this.view.createItems(elements);
        kickstarterdat.innerHTML = "";
        kickstarterdat.appendChild(elementTags);

    }
}