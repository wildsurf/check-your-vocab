var containsString = function(stringToTest, stringToLookFor, message) {

    var regex = new RegExp(stringToLookFor);
    equal(regex.test(stringToTest), true, message);

};

export default {
    containsString: containsString
};
