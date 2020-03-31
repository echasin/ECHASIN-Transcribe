from jiwer import wer
import re
from datetime import datetime

dateNow = datetime.today().strftime('%Y-%m-%d-%H:%M:%S')

############# NOTE: This is using the 90% cut off threshold. #######################
############# With a 90% cutoff, the WER is scoring at 0.14583

groundTruth = "I can't remember but but I think it was May 10th 2015. Because I have a brother in El Salvador who is a police officer. And he was attacked by the gangs. Uh like 15 years. Oh sorry he served for 10 years. As a police officer. He he's working at a police station. He is working at a national police station. Uh the gang members attacked him. I just knew that the gangs. Are the ones who attacked him. I don't know which gang. Well they called me. And he told me that he had problems. That he was scared. that he was in great danger, that they had threatened him. In my house. He called me. And he told me. That they tried to kill me. And they followed me. And ran. And also. They attacked me. They've tried to kill me because they want to extort me. And I do not accept I do not accept extortion. Yeah, they started shooting him. And they found him. And as soon as he saw this. Uh he started to run. And he was shooting back. Because there was a group waiting for him. At a place where he was heading toward his home. Yes. He got off the bus. That's where they were waiting for him. And that's where they encountered each other. Where he lives. Uh they were very lonely streets. And when he encountered them. He ran to where he could hide. He ran very far. To where they could not find him. And that's when he asked for help. For somebody to notify the family. He fled from where he was, and he ran and he ran and he ran to the corn fields."
textTestList = ["I can't remember, but but I think it was may 10th 2015. Because I have a brother in El Salvador who is a police officer and he was attacked by the gangs. like 15 years. Oh, sorry. He served for 10 years as a police officer. What he He's working at a police station. He's working at a national police station. The gang members attacked him I just knew that the gangs are the ones who attacked him. I don't know which game. Well, they called me and he told me that he had problems That he was scared that he was in great danger, that they had threatened him. in my house? Your aunt and then my whole look at the hotel Armando Corner. You know, contest is el telefono. he called me and he told me that they tried to kill me and they followed me and Iran They have tried to kill me because they want to extort me and I do not accept. I do not accept extortion. Yeah, they started shooting him and they found him. And as soon as he saw this Ah, he started to run and he was shooting back. because there was a group waiting for him. at a place where he was heading toward his home. Yes. He got off the bus, right? No, that's where they were waiting for him. And that's where they encountered each other where he lives, they were very lonely streets. And when he encountered them, he ran to where he could hide He ran very far to where they could not find him. For somebody to notify the family. He fled from where he was and he ran and he ran and he ran to the corn fields."]

## Compute Word Counts
wordCountGT = len(re.findall(r'\w+', groundTruth)) 
print("GroundTruth: {}    Word Count: {:2d}              ".format(groundTruth, wordCountGT))

for textTest in textTestList:
    wordCountTT = len(re.findall(r'\w+', textTest)) 
    distance  = wer(groundTruth, textTest)
    print("{} WC: {:2d} WER: {:0.5f}".format(textTest, wordCountTT, distance, ))
