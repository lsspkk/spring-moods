package com.lvp.spring.moods;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/*


 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Weather {
    private String description;
    public Weather() {
        this.description = "";
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}



