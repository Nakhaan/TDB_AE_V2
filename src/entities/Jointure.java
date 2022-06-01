package entities;

import java.io.Serializable;

public class Jointure implements Serializable {
	int topicID;
	int messageID;
	
	public int getTopicID() {
		return topicID;
	}
	public void setTopicID(int topicID) {
		this.topicID = topicID;
	}
	public int getMessageID() {
		return messageID;
	}
	public void setMessageID(int messageID) {
		this.messageID = messageID;
	}
	
}
