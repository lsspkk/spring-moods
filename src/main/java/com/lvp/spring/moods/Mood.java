package com.lvp.spring.moods;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
/*

curl -X POST localhost:8080/api/v1/mood -d "{\"weather\": \"cloudy\", \"hour\": 9, \"mood\": \"good\"}" -H "Content-Type:application/json"





 */
@Data
@Entity
public class Mood {
    private @Id
    @GeneratedValue
    Long id;
    private String weather;
    private Integer hour;
    private String mood;

    private Mood() {}
    public Mood(String weather, Integer hour, String mood) {
        this.weather = weather;
        this.hour = hour;
        this.mood = mood;
    }
}

