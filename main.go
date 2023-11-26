package main

import (
	"fmt"
	"html/template"
	"io"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

type TemplateRenderer struct {
	templates *template.Template
}

func (t *TemplateRenderer) Render(
	w io.Writer,
	name string,
	data interface{},
	c echo.Context,
) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

type Timing struct {
	HasEnded bool
	Type     int
	Start    time.Time
	End      time.Time
}

type PageIndex struct {
	Timings []Timing
}

func round(d time.Duration, digits int) time.Duration {
	divs := []time.Duration{
		time.Duration(1), time.Duration(10), time.Duration(100), time.Duration(1000),
	}
	switch {
	case d > time.Second:
		d = d.Round(time.Second / divs[digits])
	case d > time.Millisecond:
		d = d.Round(time.Millisecond / divs[digits])
	case d > time.Microsecond:
		d = d.Round(time.Microsecond / divs[digits])
	}
	return d
}

const (
	NONE = iota
	CONSUME
	MOVEMENT
)

func main() {
	timings := []Timing{}
	timingType := NONE

	e := echo.New()
	t := &TemplateRenderer{
		templates: template.Must(template.New("").Funcs(template.FuncMap{
			"round": round,
		}).ParseGlob("./views/**/*")),
	}
	e.Renderer = t
	e.Static("/dist", "./dist")
	e.Static("/styles", "./styles")
	api := e.Group("api")

	e.GET("/", func(c echo.Context) error {
		return c.Render(http.StatusOK, "index.html", echo.Map{})
	})

	api.GET("/timings", func(c echo.Context) error {
		return c.Render(http.StatusOK, "timings.html", PageIndex{
			Timings: timings,
		})
	})

	api.GET("/time", func(c echo.Context) error {
		time := time.Duration(0)
		for _, timing := range timings {
			if timing.End.IsZero() {
				continue
			}

			if timing.Type == CONSUME {
				time -= timing.End.Sub(timing.Start)
			} else {
				time += timing.End.Sub(timing.Start)
			}
		}

		timeText := ""
		// Non value
		timeType := 0
		if time > 0 {
			timeType = 1
		} else if time < 0 {
			timeType = 2
			timeText = "-"
		}

		time = round(time.Abs(), 2)
		timeText += fmt.Sprint(time)

		return c.Render(http.StatusOK, "time.html", echo.Map{
			"Time": timeText,
			"Type": timeType,
		})
	})

	api.POST("/consume", func(c echo.Context) error {
		if timingType != NONE {
			timings[len(timings)-1].End = time.Now()
			timings[len(timings)-1].HasEnded = true
			timingType = NONE
			c.Response().Header().Add("HX-Reswap", "innerHTML")
			return c.Render(http.StatusOK, "timings.html", PageIndex{
				Timings: timings,
			})
		}

		timingType = CONSUME
		timings = append(timings, Timing{
			Start: time.Now(),
			Type:  CONSUME,
		})

		return c.Render(http.StatusOK, "timings.html", PageIndex{
			Timings: []Timing{timings[len(timings)-1]},
		})
	})

	api.POST("/movement", func(c echo.Context) error {
		if timingType != NONE {
			timings[len(timings)-1].End = time.Now()
			timings[len(timings)-1].HasEnded = true
			timingType = NONE
			c.Response().Header().Add("HX-Reswap", "innerHTML")
			return c.Render(http.StatusOK, "timings.html", PageIndex{
				Timings: timings,
			})
		}

		timingType = MOVEMENT
		timings = append(timings, Timing{
			Start: time.Now(),
			Type:  MOVEMENT,
		})

		return c.Render(http.StatusOK, "timings.html", PageIndex{
			Timings: []Timing{timings[len(timings)-1]},
		})
	})

	api.DELETE("/clear", func(c echo.Context) error {
		timings = []Timing{}
		timingType = NONE
		return c.Render(http.StatusOK, "timings.html", PageIndex{
			Timings: timings,
		})
	})

	e.Logger.Fatal(e.Start(":3000"))
}
