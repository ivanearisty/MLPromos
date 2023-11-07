import spacy
from spacy.tokens import DocBin
from parameters import parameters

class Model:
    nlp = spacy.load(parameters.modelLocation)

#To use model:
#doc = nlp_ner("Use code CRAZYDEAL2020 on Postmates for $15 off!!!")
#doc.ents
model = Model()