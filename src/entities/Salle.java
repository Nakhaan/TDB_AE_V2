package entities;

import java.util.*;

import javax.persistence.*;

@Entity
public class Salle {
	
	@Id
	private String nom;
	
	private String batiment;
	private int etage;
	private int capacite;
	private boolean projecteur;
	private boolean accees_demande;
	
	

	@OneToMany(mappedBy = "salle",fetch = FetchType.EAGER)
	private Set<Evenement> activite;
	
	
	@ManyToMany(mappedBy = "salles_accessibles")
	Set<Utilisateur> acces;


	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getBatiment() {
		return batiment;
	}


	public void setBatiment(String batiment) {
		this.batiment = batiment;
	}


	public int getEtage() {
		return etage;
	}


	public void setEtage(int etage) {
		this.etage = etage;
	}


	public int getCapacite() {
		return capacite;
	}


	public void setCapacite(int capacite) {
		this.capacite = capacite;
	}


	public boolean isProjecteur() {
		return projecteur;
	}


	public void setProjecteur(boolean projecteur) {
		this.projecteur = projecteur;
	}


	public boolean isAccees_demande() {
		return accees_demande;
	}


	public void setAccees_demande(boolean accees_demande) {
		this.accees_demande = accees_demande;
	}


	public Set<Evenement> getActivite() {
		return activite;
	}


	public void setActivite(Set<Evenement> activite) {
		this.activite = activite;
	}


	public Set<Utilisateur> getAcces() {
		return acces;
	}


	public void setAcces(Set<Utilisateur> acces) {
		this.acces = acces;
	}
	
}
