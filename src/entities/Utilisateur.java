package entities;

import java.util.Collection;
import java.util.Set;

import javax.management.relation.Role;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
public class Utilisateur {
	 
	@Id
	private String username;

	private String password;
	
	private String nom;
	
	private String prenom;
    
    private int annee;
    
    private String mail;
    
    @ManyToMany(fetch = FetchType.EAGER)
    Set<Association> associations;

    @ManyToMany(mappedBy = "participants",fetch= FetchType.EAGER)
    Set<Evenement> evenements;
    
    @ManyToMany(fetch= FetchType.EAGER) //(cascade = {CascadeType.PERSIST})
    //@JoinTable(name = "UserSalles", joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "username"), inverseJoinColumns = @JoinColumn(name = "SALLE_ID", referencedColumnName = "id"))
    Set<Salle> salles_accessibles;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}
  
  public Set<Association> getAssociations() {
		return associations;
	}

	public void setAssociations(Set<Association> associations) {
		this.associations = associations;
	}

	public Set<Evenement> getEvenements() {
		return evenements;
	}

	public void setEvenements(Set<Evenement> evenements) {
		this.evenements = evenements;
	}

	public Set<Salle> getSalles_accessibles() {
		return salles_accessibles;
	}

	public void setSalles_accessibles(Set<Salle> salles_accessibles) {
		this.salles_accessibles = salles_accessibles;
	}
    
    
}
