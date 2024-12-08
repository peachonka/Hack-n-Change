package ru.backend.mireatom.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "formulas")
public class Formula {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "latex")
    private String latex;

    @Column(name = "description")
    private String description;

    @Column(name = "tags")
    private String tags;

    public Formula() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLatex() {
        return latex;
    }

    public void setLatex(String latex) {
        this.latex = latex;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
}
