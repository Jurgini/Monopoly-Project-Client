'use strict';

function checkError(triggerAction, catchedError)
{
    const errorCause = catchedError.cause;
    displayError(errorCause);
}
