class Start extends Scene {
    create() {
        //let person = {
            //name : "bob",
            //secrets: {
                //firstLove : ["tim", "jane", "rufus"]
            //}
        //}
        let key 
        //console.log(person)
       // console.log(person.secrets.)
        this.engine.setTitle(this.engine.storyData.Title);  // * TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
        this.engine.hasKey = false;
    }
    

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // * TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // * TODO: replace this text by the Body of the location data
        if(key == "Riverbank Scene"){
            this.engine.hasKey = true;
        }
        if(locationData.Choices && locationData.Choices.length > 0) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                if(key === "Bedroom 2" && choice.Text === "Open door." && !this.engine.hasKey){
                    continue;
            }
                this.engine.addChoice(choice.Text, choice);
          // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice.Target == "Radio Message") {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(SpecialLocations, choice.Target);
        }else if(choice.Target != null){
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);     
        } else {
            this.engine.gotoScene(End);
        
        }
    }
}
class SpecialLocations extends Location {
    create(key) {
        let locationData = this.engine.storyData.SpecialLocations[key]; // * TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body);
        if(locationData.Choices && locationData.Choices.length > 0) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');