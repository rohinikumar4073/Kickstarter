export default class KickStarterModel {
    constructor() {
        this.kickStarterData = []
        this.actualData = [];
    }
    loadData(data) {
        this.kickStarterData = data;
        this.actualData = JSON.parse(JSON.stringify(data));
    }
    filterData(searchVal) {
        return this.kickStarterData.filter(function (kickStarteritem) {
            return kickStarteritem.title.toUpperCase().indexOf(searchVal) != -1;
        });
    }
    filter(searchVal,filterByLocationActive,sortData) {
        this.kickStarterData =  JSON.parse(JSON.stringify(this.actualData ));
        if (searchVal) {
            this.kickStarterData =this.filterData(searchVal);
        }
        if (filterByLocationActive) {
            this.kickStarterData =  this.filterByLocation(filterByLocationActive)
        }
        if (sortData) {
            this.kickStarterData =  this.handleSort(sortData)
        }
        return this.kickStarterData;
    }
    filterByLocation(location) {
        return this.kickStarterData.filter(function (kickStarteritem) {
            return kickStarteritem.location.indexOf(location) != -1;
        });
    }
    handleSort(sortData) {

        return this.kickStarterData.sort((a, b) => {
            if (sortData.type === "date") {
                if (sortData.sortBy === "asc")
                    return new Date(a[sortData.element]).getTime() - new Date(b[sortData.element]).getTime();
                else
                    return new Date(b[sortData.element]).getTime() - new Date(a[sortData.element]).getTime()
            } else {
                if (sortData.sortBy === "asc")
                    return a[sortData.element] - b[sortData.element];
                else
                    return b[sortData.element] - a[sortData.element];
            }
        });
    }
    getLocations() {
        let locations = [];
        this.actualData.forEach(function (kickStarteritem) {
            if (locations.indexOf(kickStarteritem.location) == -1)
                locations.push(kickStarteritem.location)
        });
        return locations;
    }

}