package com.lvp.spring.moods;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

/*


 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class PlainWeather {
    private String description;
    private Float temp;


    private List<Weather> weather;

    public Main getMain() {
        return main;
    }

    public void setMain(Main main) {
        this.main = main;
    }

    private Main main;
    public PlainWeather() {
        this.temp = new Float(0.0);
        this.description = "";
    }
    public PlainWeather(String description, Float temp) {
        this.temp = temp;
        this.description = description;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getTemp() {
        return temp;
    }

    public void setTemp(Float temp) {
        this.temp = temp;
    }

    public List<Weather> getWeather() {
        return weather;
    }

    public void setWeather(List<Weather> weather) {
        this.weather = weather;
    }


    @Override
    public String toString() {
        String desc = "";
        if( !weather.isEmpty() ) {
            Weather w = (Weather) weather.get(0);
            if (w != null)
                desc = w.getDescription();
        }
        if( main != null ) {
            return "{\"description\": \"" + desc + "\"," +
                    "\"temp\": " + this.main.getTemp().toString() + "}";
        }
        return "weather not initialized";

    }
}



